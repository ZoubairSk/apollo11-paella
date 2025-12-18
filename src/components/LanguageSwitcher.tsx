"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n";

function getCurrentLocale(pathname: string): Locale | null {
  for (const locale of locales) {
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) return locale;
  }
  return null;
}

function swapLocale(pathname: string, to: Locale) {
  const current = getCurrentLocale(pathname);
  if (!current) return `/${to}`;
  if (pathname === `/${current}`) return `/${to}`;
  return pathname.replace(`/${current}/`, `/${to}/`);
}

export function LanguageSwitcher() {
  const pathname = usePathname();
  const current = getCurrentLocale(pathname) ?? "es";

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-surface px-1 py-1 text-sm">
      <Link
        className={`rounded-full px-3 py-1.5 ${
          current === "es" ? "bg-surface-2 text-foreground" : "text-muted hover:text-foreground"
        }`}
        href={swapLocale(pathname, "es")}
        aria-current={current === "es" ? "page" : undefined}
      >
        ES
      </Link>
      <Link
        className={`rounded-full px-3 py-1.5 ${
          current === "en" ? "bg-surface-2 text-foreground" : "text-muted hover:text-foreground"
        }`}
        href={swapLocale(pathname, "en")}
        aria-current={current === "en" ? "page" : undefined}
      >
        EN
      </Link>
      <span className="sr-only">Cambiar idioma</span>
    </div>
  );
}


