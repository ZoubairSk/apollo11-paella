import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { Locale } from "@/lib/i18n";

const IndexedDocSchema = z.object({
  locale: z.string(),
  section: z.string(),
  slug: z.string(), // route path segment or "index"
  title: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type IndexedDoc = z.infer<typeof IndexedDocSchema>;

async function walk(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out: string[] = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.isFile() && (e.name.endsWith(".mdx") || e.name.endsWith(".md"))) out.push(full);
  }
  return out;
}

export async function indexLocaleContent(locale: Locale): Promise<IndexedDoc[]> {
  const root = path.join(process.cwd(), "content", locale);
  const files = await walk(root);

  return files
    .map((filePath) => {
      const rel = path.relative(root, filePath); // e.g. "carrera-espacial/index.mdx"
      const parts = rel.split(path.sep);
      const section = parts[0] ?? "pages";
      const filename = parts.at(-1) ?? "";
      const slug = filename.replace(/\.mdx?$/, "");

      return { filePath, section, slug };
    })
    .map(({ filePath, section, slug }) => {
      return fs.readFile(filePath, "utf8").then((raw) => {
        const parsed = matter(raw);
        const data = parsed.data as Record<string, unknown>;
        return IndexedDocSchema.parse({
          locale,
          section,
          slug,
          title: typeof data.title === "string" ? data.title : slug,
          description: typeof data.description === "string" ? data.description : undefined,
          tags: Array.isArray(data.tags) ? data.tags.filter((t) => typeof t === "string") : undefined,
        });
      });
    })
    .reduce(async (accP, docP) => {
      const acc = await accP;
      acc.push(await docP);
      return acc;
    }, Promise.resolve([] as IndexedDoc[]));
}


