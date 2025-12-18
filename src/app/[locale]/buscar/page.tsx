"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Doc = {
  title: string;
  description?: string;
  href: string;
  tags?: string[];
};

// Lightweight, client-side search index.
// For now we keep it minimal and manually curated; later we can auto-generate at build time.
function getIndex(locale: "es" | "en"): Doc[] {
  const isES = locale === "es";
  return [
    {
      title: isES ? "Carrera Espacial" : "Space Race",
      description: isES
        ? "Contexto, avances y programas soviético/estadounidense."
        : "Context, advances, and Soviet/U.S. programs.",
      href: `/${locale}/carrera-espacial`,
      tags: [isES ? "Contexto" : "Context", "URSS", "NASA", isES ? "Tecnología" : "Technology"],
    },
    {
      title: isES ? "Cronología" : "Timeline",
      description: isES ? "Hitos 1957–1975." : "Key events 1957–1975.",
      href: `/${locale}/cronologia`,
      tags: [isES ? "Cronología" : "Timeline", "Sputnik", "Apollo"],
    },
    {
      title: isES ? "Misión Apollo XI" : "Apollo XI Mission",
      description: isES ? "Saturn V, Eagle y alunizaje." : "Saturn V, Eagle, and the landing.",
      href: `/${locale}/mision-apollo-xi`,
      tags: ["Saturn V", "Eagle", isES ? "Alunizaje" : "Landing"],
    },
    {
      title: isES ? "Impacto y legado" : "Impact and legacy",
      description: isES ? "Ciencia, cultura y debate ético." : "Science, culture, and ethics debate.",
      href: `/${locale}/impacto-y-legado`,
      tags: [isES ? "Ética" : "Ethics", isES ? "Legado" : "Legacy"],
    },
    {
      title: isES ? "Recursos y bibliografía" : "Resources and bibliography",
      description: isES ? "Fuentes recomendadas y notas de citación." : "Recommended sources and citation notes.",
      href: `/${locale}/recursos`,
      tags: ["NASA", isES ? "Bibliografía" : "Bibliography"],
    },
    {
      title: isES ? "Etiquetas" : "Tags",
      description: isES ? "Explora contenidos por tema." : "Browse content by topic.",
      href: `/${locale}/tags`,
      tags: [isES ? "Tags" : "Tags"],
    },
  ];
}

export default function BuscarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [locale, setLocale] = useState<"es" | "en">("es");
  const [q, setQ] = useState("");

  // App Router params are async in this codebase.
  // We resolve once on mount; locale doesn't change without navigation.
  useEffect(() => {
    void params.then((p) => setLocale(p.locale === "en" ? "en" : "es"));
  }, [params]);

  const index = useMemo(() => getIndex(locale), [locale]);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return index.filter((d) => {
      const hay = [d.title, d.description ?? "", ...(d.tags ?? [])].join(" ").toLowerCase();
      return hay.includes(query);
    });
  }, [q, index]);

  return (
    <main id="contenido" className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {locale === "es" ? "Búsqueda" : "Search"}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
        {locale === "es"
          ? "Busca por conceptos (Guerra Fría, Saturn V, URSS, ética, etc.)."
          : "Search by concepts (Cold War, Saturn V, USSR, ethics, etc.)."}
      </p>

      <div className="mt-8">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={locale === "es" ? "Escribe para buscar…" : "Type to search…"}
          className="w-full rounded-[var(--radius-md)] border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted focus:outline-none"
        />
      </div>

      <ul className="mt-8 space-y-3">
        {results.map((r) => (
          <li key={r.href} className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
            <Link className="text-foreground font-semibold hover:underline" href={r.href}>
              {r.title}
            </Link>
            {r.description ? <p className="mt-1 text-sm text-muted">{r.description}</p> : null}
          </li>
        ))}
      </ul>

      {!q.trim() ? (
        <p className="mt-8 text-sm text-muted">
          {locale === "es" ? "Sugerencia: prueba “Saturn V” o “Guerra Fría”." : "Tip: try “Saturn V” or “Cold War”."}
        </p>
      ) : null}
    </main>
  );
}


