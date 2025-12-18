import { notFound } from "next/navigation";
import { getMdxBySlug } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const slug = locale === "es" ? ["sobre"] : ["about"];

  const mdx = await getMdxBySlug({
    locale: locale as Locale,
    collection: "pages",
    slug,
  });

  return (
    <main id="contenido" className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {mdx.frontmatter.title}
      </h1>
      {mdx.frontmatter.description ? (
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
          {mdx.frontmatter.description}
        </p>
      ) : null}
      <article className="richtext mt-10">
        {mdx.content}
      </article>
    </main>
  );
}


