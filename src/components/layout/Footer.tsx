import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "footer" });

  return (
    <footer className="border-t border-white/10" style={{ backgroundColor: "#1C1917" }}>
      <div className="max-w-6xl mx-auto py-12 px-4">
        {/* Logo & Tagline */}
        <div className="mb-8">
          <p className="text-white font-bold tracking-wider text-lg">
            TRADING HOUSE
          </p>
          <p className="text-white/80 text-sm mt-1">{t("tagline")}</p>
        </div>

        {/* Contact & Legal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">
              {t("contact")}
            </h3>
            <ul className="space-y-1.5 text-sm text-white/80">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-3">
              {t("legal")}
            </h3>
            <ul className="space-y-1.5 text-sm text-white/80">
              <li>
                <Link
                  href="/impressum"
                  className="hover:text-white transition-colors"
                >
                  {t("impressum")}
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="hover:text-white transition-colors"
                >
                  {t("datenschutz")}
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  {t("faq")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Language Switcher & Copyright */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Language Links */}
          <div className="flex items-center gap-3 text-sm text-white/80">
            <Link
              href="/"
              locale="de"
              className={`hover:text-white transition-colors ${
                locale === "de" ? "text-white font-medium" : ""
              }`}
            >
              🇩🇪 Deutsch
            </Link>
            <span className="text-white/40">|</span>
            <Link
              href="/"
              locale="uk"
              className={`hover:text-white transition-colors ${
                locale === "uk" ? "text-white font-medium" : ""
              }`}
            >
              🇺🇦 Українська
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/60">{t("rights")}</p>
        </div>
      </div>
    </footer>
  );
}
