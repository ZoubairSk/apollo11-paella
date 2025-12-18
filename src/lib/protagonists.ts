import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

const ProtagonistSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  role_es: z.string().min(1),
  role_en: z.string().min(1),
  bio_es: z.string().min(1),
  bio_en: z.string().min(1),
});

const ProtagonistsSchema = z.object({
  version: z.number().int(),
  items: z.array(ProtagonistSchema),
});

export type Protagonist = z.infer<typeof ProtagonistSchema>;

export async function getProtagonists(): Promise<Protagonist[]> {
  const filePath = path.join(process.cwd(), "content", "data", "protagonists.json");
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = JSON.parse(raw) as unknown;
  const data = ProtagonistsSchema.parse(parsed);
  return data.items;
}

export async function getProtagonistBySlug(slug: string): Promise<Protagonist | null> {
  const items = await getProtagonists();
  return items.find((p) => p.slug === slug) ?? null;
}


