import Link from "next/link";
import { notFound } from "next/navigation";
import { getMdxBySlug } from "@/lib/content";
import { isLocale } from "@/lib/i18n";
import { listSectionPages } from "@/lib/sectionContent";

export default async function MisionApolloXISubPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const pages = await listSectionPages({ locale, section: "mision-apollo-xi" });

  const mappedSlug =
    locale === "en" && slug === "modulo-eagle"
      ? "eagle-module"
      : locale === "en" && slug === "alunizaje"
        ? "moon-landing"
        : slug;

  const mdx = await getMdxBySlug({
    locale,
    collection: "mision-apollo-xi",
    slug: [mappedSlug],
  });

  return (
    <main id="contenido" className="mx-auto max-w-5xl px-6 py-14">
      <div className="grid gap-10 md:grid-cols-[1fr_280px]">
        <div>
          <Link className="text-sm text-muted hover:text-foreground" href={`/${locale}/mision-apollo-xi`}>
            ← {locale === "es" ? "Volver a la misión" : "Back to mission"}
          </Link>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {mdx.frontmatter.title}
          </h1>
          {mdx.frontmatter.description ? (
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              {mdx.frontmatter.description}
            </p>
          ) : null}

          <article className="richtext mt-10">{mdx.content}</article>
        </div>

        <aside className="md:pt-2">
          <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
            <p className="text-sm font-medium text-foreground">
              {locale === "es" ? "En esta sección" : "In this section"}
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {pages
                .filter((p) => p.slug !== "index")
                .map((p) => (
                  <li key={p.slug}>
                    <Link
                      className={`hover:text-foreground ${
                        p.slug === slug ? "text-foreground" : "text-muted"
                      }`}
                      href={`/${locale}/mision-apollo-xi/${p.slug}`}
                      aria-current={p.slug === slug ? "page" : undefined}
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}


