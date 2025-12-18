import { notFound } from "next/navigation";
import { getTimeline } from "@/lib/timeline";
import { isLocale } from "@/lib/i18n";

export default async function CronologiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const tl = await getTimeline();
  const isES = locale === "es";

  return (
    <main id="contenido" className="mx-auto max-w-5xl px-6 py-14">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {isES ? "Cronología" : "Timeline"}
      </h1>
      <p className="mt-3 max-w-2xl text-base leading-7 text-muted">
        {isES
          ? "Eventos clave desde los inicios de la Carrera Espacial hasta el periodo posterior a Apollo 11."
          : "Key events from the start of the Space Race through the post–Apollo 11 era."}
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
          <p className="text-sm font-medium text-foreground">{isES ? "Antes" : "Before"}</p>
          <p className="mt-1 text-sm text-muted">{isES ? "1957–1968" : "1957–1968"}</p>
        </div>
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
          <p className="text-sm font-medium text-foreground">{isES ? "Año clave" : "Key year"}</p>
          <p className="mt-1 text-sm text-muted">1969</p>
        </div>
        <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
          <p className="text-sm font-medium text-foreground">{isES ? "Después" : "After"}</p>
          <p className="mt-1 text-sm text-muted">{isES ? "1970–1975" : "1970–1975"}</p>
        </div>
      </div>

      <ol className="mt-10 space-y-4">
        {tl.events
          .slice()
          .sort((a, b) => a.year - b.year)
          .map((e) => (
            <li
              key={e.id}
              className="rounded-[var(--radius-md)] border border-border bg-surface p-5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-lg font-semibold text-foreground">
                  {e.year} · {isES ? e.title_es : e.title_en}
                </h2>
              </div>
              <p className="mt-2 text-sm leading-7 text-muted">
                {isES ? e.summary_es : e.summary_en}
              </p>
            </li>
          ))}
      </ol>
    </main>
  );
}


