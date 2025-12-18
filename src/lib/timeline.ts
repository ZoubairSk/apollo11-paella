import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

const TimelineEventSchema = z.object({
  id: z.string().min(1),
  year: z.number().int(),
  title_es: z.string().min(1),
  title_en: z.string().min(1),
  summary_es: z.string().min(1),
  summary_en: z.string().min(1),
});

const TimelineSchema = z.object({
  version: z.number().int(),
  events: z.array(TimelineEventSchema),
});

export type Timeline = z.infer<typeof TimelineSchema>;
export type TimelineEvent = z.infer<typeof TimelineEventSchema>;

export async function getTimeline(): Promise<Timeline> {
  const filePath = path.join(process.cwd(), "content", "data", "timeline.json");
  const raw = await fs.readFile(filePath, "utf8");
  const parsed = JSON.parse(raw) as unknown;
  return TimelineSchema.parse(parsed);
}


