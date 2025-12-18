import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import Link from "next/link";
import { getMdxBySlug } from "@/lib/content";
import { listSectionPages } from "@/lib/sectionContent";

export default async function MisionApolloXIPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const pages = await listSectionPages({ locale, section: "mision-apollo-xi" });
  const index = await getMdxBySlug({
    locale,
    collection: "mision-apollo-xi",
    slug: ["index"],
  });

  return (
    <main id="contenido" className="mx-auto max-w-5xl px-6 py-14">
      <div className="grid gap-10 md:grid-cols-[1fr_280px]">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {index.frontmatter.title}
          </h1>
          {index.frontmatter.description ? (
            <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
              {index.frontmatter.description}
            </p>
          ) : null}
          <article className="richtext mt-10">{index.content}</article>
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
                      className="text-muted hover:text-foreground"
                      href={`/${locale}/mision-apollo-xi/${p.slug}`}
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


