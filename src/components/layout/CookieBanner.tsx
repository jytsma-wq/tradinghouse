"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const CONSENT_COOKIE = "cookie_consent";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function hasConsentCookie() {
  return document.cookie
    .split(";")
    .some((cookie) => cookie.trim().startsWith(`${CONSENT_COOKIE}=`));
}

export function CookieBanner() {
  const t = useTranslations("cookieBanner");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(!hasConsentCookie());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  function saveConsent(value: "accepted" | "declined") {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax${secure}`;
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-mist bg-white/95 px-4 py-4 shadow-lg backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-steel">{t("message")}</p>
        <div className="flex shrink-0 gap-2">
          <Button
            type="button"
            variant="outline"
            className="border-mist"
            onClick={() => saveConsent("declined")}
          >
            {t("decline")}
          </Button>
          <Button
            type="button"
            className="bg-accent text-white hover:bg-accent-hover"
            onClick={() => saveConsent("accepted")}
          >
            {t("accept")}
          </Button>
        </div>
      </div>
    </div>
  );
}
