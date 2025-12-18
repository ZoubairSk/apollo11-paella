import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { getSiteUrl } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const baseTitle = "Carrera Espacial Apollo XI";
  const description =
    locale === "es"
      ? "Explora el contexto histórico, protagonistas y cronología de la Carrera Espacial y la misión Apollo XI."
      : "Explore the historical context, key figures, and timeline of the Space Race and the Apollo XI mission.";

  return {
    metadataBase: getSiteUrl(),
    title: baseTitle,
    description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
      },
    },
    openGraph: {
      title: baseTitle,
      description,
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // We keep <html> in root layout, but can still set lang for a11y via attribute here using a wrapper.
  // (Next.js does not allow nested <html>.)
  return (
    <div data-locale={locale} lang={locale}>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-foreground"
      >
        {locale === "es" ? "Saltar al contenido" : "Skip to content"}
      </a>
      <NavBar locale={locale} />
      {children}
      <Footer locale={locale} />
    </div>
  );
}


