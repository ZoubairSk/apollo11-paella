import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted">
          <p className="text-foreground font-medium">Carrera Espacial Apollo XI</p>
          <p>
            {locale === "es"
              ? "Sitio educativo. Contenido en construcción."
              : "Educational site. Content in progress."}
          </p>
        </div>
        <div className="flex gap-4 text-sm text-muted">
          <Link className="hover:text-foreground" href={`/${locale}/sobre`}>
            {locale === "es" ? "Sobre el proyecto" : "About"}
          </Link>
          <Link className="hover:text-foreground" href={`/${locale}/tags`}>
            {locale === "es" ? "Etiquetas" : "Tags"}
          </Link>
        </div>
      </div>
    </footer>
  );
}


