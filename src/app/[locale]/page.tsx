import Link from "next/link";
import { notFound } from "next/navigation";
import { HtmlLang } from "@/components/HtmlLang";
import { isLocale } from "@/lib/i18n";
import { getMdxBySlug } from "@/lib/content";

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const isES = locale === "es";
  const mdx = await getMdxBySlug({
    locale,
    collection: "pages",
    slug: [isES ? "inicio" : "home"],
  });

  return (
    <main
      id="contenido"
      className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-5xl flex-col justify-center px-6 py-16"
    >
      <HtmlLang locale={locale} />

      <p className="text-sm font-medium tracking-wide text-muted">
        {isES ? "Carrera Espacial" : "Space Race"} · Apollo XI
      </p>

      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
        {mdx.frontmatter.title}
      </h1>

      <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted">
        {mdx.frontmatter.description ??
          (isES
            ? "Un recorrido claro y visual por el contexto histórico, la tecnología y la misión que marcó un hito en 1969."
            : "A clear, visual tour through the historical context, technology, and the mission that marked a milestone in 1969.")}
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-background hover:opacity-90"
          href={`/${locale}/cronologia`}
        >
          {isES ? "Ver cronología" : "View timeline"}
        </Link>
        <Link
          className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-surface px-6 text-sm font-medium text-foreground hover:bg-surface-2"
          href={`/${locale}/protagonistas`}
        >
          {isES ? "Conocer protagonistas" : "Meet the crew"}
        </Link>
      </div>

      <section className="mt-14 rounded-[var(--radius-lg)] border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-foreground">
          {isES ? "Comienza por aquí" : "Start here"}
        </h2>
        <article className="richtext mt-4">{mdx.content}</article>
      </section>
    </main>
  );
}


