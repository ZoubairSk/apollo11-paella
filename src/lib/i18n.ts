export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (locales as readonly any[]).includes(value);
}


