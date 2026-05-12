import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { siteConfig } from "@/config/site";
import { db } from "@/lib/db";

export const runtime = "nodejs";

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimit = new Map<string, RateLimitEntry>();

const emptyToUndefined = (value: unknown) => {
  if (typeof value === "string" && value.trim() === "") {
    return undefined;
  }

  return value;
};

const contactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  phone: z.preprocess(emptyToUndefined, z.string().trim().max(80).optional()),
  interest: z.preprocess(emptyToUndefined, z.string().trim().max(120).optional()),
  message: z.string().trim().min(1).max(5000),
  _trap: z.string().optional().default(""),
});

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = rateLimit.get(ip);

  if (!current || current.resetAt <= now) {
    rateLimit.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (current.count >= RATE_LIMIT_MAX) {
    return true;
  }

  current.count += 1;
  return false;
}

function hasFilledTrap(body: unknown) {
  if (!body || typeof body !== "object" || !("_trap" in body)) {
    return false;
  }

  const trap = (body as { _trap?: unknown })._trap;

  return typeof trap === "string" && trap.trim() !== "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderEmailHtml(values: z.infer<typeof contactSchema>) {
  const rows = [
    ["Name", values.name],
    ["E-Mail", values.email],
    ["Telefon", values.phone || "-"],
    ["Produktinteresse", values.interest || "-"],
    ["Nachricht", values.message],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #172026; line-height: 1.5;">
      <h1 style="font-size: 22px; margin: 0 0 16px;">Neue Anfrage über Trading House</h1>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tbody>
          ${rows
            .map(
              ([label, value]) => `
                <tr>
                  <th style="border: 1px solid #d9e0e6; background: #f6f8fa; padding: 10px; text-align: left; width: 180px; vertical-align: top;">
                    ${escapeHtml(label)}
                  </th>
                  <td style="border: 1px solid #d9e0e6; padding: 10px; white-space: pre-wrap;">
                    ${escapeHtml(value)}
                  </td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid contact form data." },
        { status: 400 },
      );
    }

    if (hasFilledTrap(body)) {
      return NextResponse.json({ success: true });
    }

    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid contact form data." },
        { status: 400 },
      );
    }

    const { _trap, ...submission } = parsed.data;

    await db.inquiry.create({
      data: submission,
    });

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service is not configured." },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from:
        process.env.RESEND_FROM_EMAIL ||
        "Trading House <onboarding@resend.dev>",
      to: siteConfig.email,
      replyTo: submission.email,
      subject: `Neue Anfrage von ${submission.name}`,
      html: renderEmailHtml(parsed.data),
    });

    if (error) {
      return NextResponse.json(
        { error: "Email could not be sent." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form submission failed:", error);

    return NextResponse.json(
      { error: "Contact form submission failed." },
      { status: 500 },
    );
  }
}
