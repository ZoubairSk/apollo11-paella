import Link from "next/link";
import { notFound } from "next/navigation";
import { getProtagonists } from "@/lib/protagonists";
import { isLocale } from "@/lib/i18n";

export default async function ProtagonistasPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const items = await getProtagonists();
  const isES = locale === "es";

  return (
    <main id="contenido" className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {isES ? "Protagonistas" : "Key figures"}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
        {isES
          ? "Las personas que hicieron posible la misión Apollo 11."
          : "The people who made the Apollo 11 mission possible."}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/${locale}/protagonistas/${p.slug}`}
            className="group rounded-[var(--radius-md)] border border-border bg-surface p-5 hover:bg-surface-2"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground group-hover:underline">
                  {p.name}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {isES ? p.role_es : p.role_en}
                </p>
              </div>
              <span className="text-muted">→</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-muted">
              {isES ? p.bio_es : p.bio_en}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}


