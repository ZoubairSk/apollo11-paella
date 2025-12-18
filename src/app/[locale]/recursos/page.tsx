import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getMdxBySlug } from "@/lib/content";

export default async function RecursosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const mdx = await getMdxBySlug({
    locale,
    collection: "recursos",
    slug: ["index"],
  });

  return (
    <main id="contenido" className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {mdx.frontmatter.title}
      </h1>
      {mdx.frontmatter.description ? (
        <p className="mt-3 max-w-2xl text-base leading-7 text-muted">{mdx.frontmatter.description}</p>
      ) : null}
      <article className="richtext mt-10">{mdx.content}</article>
    </main>
  );
}


