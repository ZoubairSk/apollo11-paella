import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { locales, type Locale } from "@/lib/i18n";

const SectionPageSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  order: z.number().int().nonnegative().optional(),
});

export type SectionPage = z.infer<typeof SectionPageSchema>;

async function listMdxFiles(dir: string) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && (e.name.endsWith(".mdx") || e.name.endsWith(".md")))
    .map((e) => e.name);
  return files;
}

export async function listSectionPages(opts: { locale: Locale; section: string }): Promise<SectionPage[]> {
  const sectionDir = path.join(process.cwd(), "content", opts.locale, opts.section);
  const files = await listMdxFiles(sectionDir);

  const pages: SectionPage[] = [];

  for (const file of files) {
    const full = path.join(sectionDir, file);
    const raw = await fs.readFile(full, "utf8");
    // Lightweight frontmatter parse to avoid importing gray-matter twice.
    // We'll reuse gray-matter for rendering later; for listing, keep minimal.
    const match = raw.match(/^---\n([\s\S]*?)\n---/);
    const fmRaw = match?.[1] ?? "";
    const get = (key: string) => {
      const line = fmRaw
        .split("\n")
        .map((l) => l.trim())
        .find((l) => l.startsWith(`${key}:`));
      if (!line) return undefined;
      const val = line.slice(key.length + 1).trim();
      return val.replace(/^"(.+)"$/, "$1");
    };

    const slug = file.replace(/\.mdx?$/, "");
    const orderVal = get("order");
    const order = orderVal ? Number(orderVal) : undefined;

    pages.push(
      SectionPageSchema.parse({
        slug,
        title: get("title") ?? slug,
        description: get("description"),
        order: Number.isFinite(order) ? order : undefined,
      }),
    );
  }

  return pages.sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));
}

export function ensureLocale(locale: string): Locale | null {
  // small helper for dynamic routes
  return (locales as readonly string[]).includes(locale) ? (locale as Locale) : null;
}


