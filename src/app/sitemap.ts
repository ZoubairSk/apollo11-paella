import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { getProtagonists } from "@/lib/protagonists";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const protagonists = await getProtagonists();

  const staticPaths = [
    "",
    "/carrera-espacial",
    "/protagonistas",
    "/cronologia",
    "/mision-apollo-xi",
    "/sobre",
  ];

  const urls: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const p of staticPaths) {
      urls.push({
        url: new URL(`/${locale}${p}`, baseUrl).toString(),
      });
    }
    for (const person of protagonists) {
      urls.push({
        url: new URL(`/${locale}/protagonistas/${person.slug}`, baseUrl).toString(),
      });
    }
  }

  return urls;
}


