import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { z } from "zod";
import type { Locale } from "@/lib/i18n";

const FrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1).optional(),
  // optional ordering for side-nav / listings
  order: z.number().int().nonnegative().optional(),
  tags: z.array(z.string().min(1)).optional(),
  author: z.string().min(1).optional(),
  created_at: z.string().min(1).optional(),
  updated_at: z.string().min(1).optional(),
  type: z.string().min(1).optional(),
  section: z.string().min(1).optional(),
});

export type Frontmatter = z.infer<typeof FrontmatterSchema>;

function contentRoot() {
  // `apolloxi-web/content/...`
  return path.join(process.cwd(), "content");
}

export async function getMdxBySlug(opts: {
  locale: Locale;
  collection: string; // e.g. "pages", "articles"
  slug: string[]; // path segments
}) {
  const filePath = path.join(contentRoot(), opts.locale, opts.collection, ...opts.slug) + ".mdx";
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = matter(raw);
  const frontmatter = FrontmatterSchema.parse(parsed.data);

  const compiled = await compileMDX<Frontmatter>({
    source: parsed.content,
    options: { parseFrontmatter: false },
    components: {},
  });

  return {
    filePath,
    frontmatter,
    content: compiled.content,
  };
}


