import Link from "next/link";
import { notFound } from "next/navigation";
import { getProtagonistBySlug } from "@/lib/protagonists";
import { isLocale } from "@/lib/i18n";
import { getMdxBySlug } from "@/lib/content";

export default async function ProtagonistPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const p = await getProtagonistBySlug(slug);
  if (!p) notFound();

  const isES = locale === "es";

  const mdx = await getMdxBySlug({
    locale,
    collection: "protagonistas",
    slug: [slug],
  });

  return (
    <main id="contenido" className="mx-auto max-w-5xl px-6 py-14">
      <Link className="text-sm text-muted hover:text-foreground" href={`/${locale}/protagonistas`}>
        ← {isES ? "Volver" : "Back"}
      </Link>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {p.name}
      </h1>
      <p className="mt-2 text-base text-muted">{isES ? p.role_es : p.role_en}</p>

      <section className="mt-10 rounded-[var(--radius-md)] border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-foreground">{isES ? "Perfil" : "Profile"}</h2>
        <p className="mt-2 text-sm leading-7 text-muted">{isES ? p.bio_es : p.bio_en}</p>
        <article className="richtext mt-6">{mdx.content}</article>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-foreground">
            {isES ? "¿Por qué importa su rol?" : "Why their role mattered"}
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            {isES
              ? "Apollo 11 fue una coreografía de decisiones: el rol de cada persona se diseñó para reducir riesgo y asegurar redundancia."
              : "Apollo 11 was a choreography of decisions: each role was designed to reduce risk and ensure redundancy."}
          </p>
        </div>
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-6">
          <h2 className="text-lg font-semibold text-foreground">
            {isES ? "Clave del trabajo en equipo" : "A teamwork highlight"}
          </h2>
          <p className="mt-2 text-sm leading-7 text-muted">
            {isES
              ? "La misión se sostuvo con disciplina operativa: checklists, comunicación clara y entrenamiento para escenarios improbables."
              : "The mission relied on operational discipline: checklists, clear comms, and training for unlikely scenarios."}
          </p>
        </div>
      </section>
    </main>
  );
}


