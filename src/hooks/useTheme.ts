import { useState, useEffect } from "react";

type Theme = "dark" | "light";

/**
 * Reads the current theme from the <html data-theme="..."> attribute
 * and re-renders whenever ThemeToggle switches it.
 */
export function useTheme(): Theme {
  const getTheme = (): Theme => {
    // data-theme is set by ThemeToggle's useEffect — read localStorage as
    // fallback so the initial value is correct before that effect fires.
    const attr = document.documentElement.getAttribute("data-theme") as Theme | null;
    if (attr === "dark" || attr === "light") return attr;
    return (localStorage.getItem("theme") as Theme) ?? "dark";
  };

  const [theme, setTheme] = useState<Theme>(getTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(getTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}
