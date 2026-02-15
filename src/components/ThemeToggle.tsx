import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div
      className="theme-toggle"
      onClick={toggleTheme}
      title={`Mudar para modo ${theme === "dark" ? "claro" : "escuro"}`}
    >
      {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
    </div>
  );
};

export default ThemeToggle;
