import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/i18n";

export function NavBar({ locale }: { locale: Locale }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link href={`/${locale}`} className="font-semibold tracking-tight text-foreground">
          Apollo XI
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted sm:flex">
          <Link className="hover:text-foreground" href={`/${locale}/carrera-espacial`}>
            {locale === "es" ? "Carrera Espacial" : "Space Race"}
          </Link>
          <Link className="hover:text-foreground" href={`/${locale}/protagonistas`}>
            {locale === "es" ? "Protagonistas" : "Key figures"}
          </Link>
          <Link className="hover:text-foreground" href={`/${locale}/cronologia`}>
            {locale === "es" ? "Cronología" : "Timeline"}
          </Link>
          <Link className="hover:text-foreground" href={`/${locale}/mision-apollo-xi`}>
            {locale === "es" ? "Misión" : "Mission"}
          </Link>
          <Link className="hover:text-foreground" href={`/${locale}/impacto-y-legado`}>
            {locale === "es" ? "Impacto" : "Impact"}
          </Link>
          <Link className="hover:text-foreground" href={`/${locale}/recursos`}>
            {locale === "es" ? "Recursos" : "Resources"}
          </Link>
          <Link className="hover:text-foreground" href={`/${locale}/buscar`}>
            {locale === "es" ? "Buscar" : "Search"}
          </Link>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}


