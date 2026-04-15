export type TechIcon =
  | { src: "skillicons"; slug: string }
  | { src: "coreui"; slug: string; whiteOnLight?: boolean }
  | { src: "stores"; slug: string };

export const TECH_ICONS: Record<string, TechIcon> = {
  "React":       { src: "skillicons", slug: "react" },
  "Node.js":     { src: "skillicons", slug: "nodejs" },
  "Express":     { src: "skillicons", slug: "express" },
  "TypeScript":  { src: "skillicons", slug: "ts" },
  "Tailwind CSS":{ src: "skillicons", slug: "tailwind" },
  "MySQL":       { src: "skillicons", slug: "mysql" },
  "Stripe":      { src: "coreui", slug: "cib-stripe", whiteOnLight: true },
  "Tebex":       { src: "stores", slug: "tebex" },
};

export function getTechIconUrl(icon: TechIcon, theme: "light" | "dark"): string {
  if (icon.src === "skillicons") {
    return `https://skillicons.dev/icons?i=${icon.slug}&theme=${theme}`;
  }
  if (icon.src === "coreui") {
    return `https://cdn.jsdelivr.net/npm/@coreui/icons/svg/brand/${icon.slug}.svg`;
  }
  // filename theme is inverted: dark icon = for light bg, light icon = for dark bg
  const fileTheme = theme === "dark" ? "light" : "dark";
  return `/images/icons/${icon.slug}-${fileTheme}.svg`;
}
