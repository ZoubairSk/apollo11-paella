import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { indexLocaleContent } from "@/lib/indexContent";

export default async function TagsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ t?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const { t } = await searchParams;
  const docs = await indexLocaleContent(locale);

  const tags = docs
    .flatMap((d) => d.tags ?? [])
    .map((x) => x.trim())
    .filter(Boolean);

  const unique = Array.from(new Set(tags)).sort((a, b) => a.localeCompare(b));

  const selected = t ? t.trim() : "";

  const filtered = selected
    ? docs.filter((d) => (d.tags ?? []).some((tg) => tg.toLowerCase() === selected.toLowerCase()))
    : [];

  return (
    <main id="contenido" className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {locale === "es" ? "Etiquetas" : "Tags"}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
        {locale === "es"
          ? "Explora contenidos relacionados por tema (Guerra Fría, URSS, NASA, ética, etc.)."
          : "Browse related content by topic (Cold War, USSR, NASA, ethics, etc.)."}
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {unique.map((tag) => (
          <Link
            key={tag}
            href={`/${locale}/tags?t=${encodeURIComponent(tag)}`}
            className={`rounded-full border border-border px-3 py-1 text-sm ${
              selected && tag.toLowerCase() === selected.toLowerCase()
                ? "bg-surface-2 text-foreground"
                : "bg-surface text-muted hover:text-foreground"
            }`}
          >
            {tag}
          </Link>
        ))}
      </div>

      {selected ? (
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-foreground">
            {locale === "es" ? "Resultados" : "Results"}: {selected}
          </h2>
          <ul className="mt-4 space-y-3">
            {filtered.map((d) => {
              const href =
                d.section === "pages"
                  ? `/${locale}`
                  : `/${locale}/${d.section}/${d.slug === "index" ? "" : d.slug}`.replace(/\/$/, "");
              return (
                <li key={`${d.section}:${d.slug}`} className="rounded-[var(--radius-md)] border border-border bg-surface p-5">
                  <Link className="text-foreground font-semibold hover:underline" href={href}>
                    {d.title}
                  </Link>
                  {d.description ? <p className="mt-1 text-sm text-muted">{d.description}</p> : null}
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </main>
  );
}


