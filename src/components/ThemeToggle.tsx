import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme: applyToggle } = useTheme();
  const [loading, setLoading] = useState(false);

  const toggleTheme = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      applyToggle();
      setLoading(false);
    }, 600);
  };

  return (
    <button
      className={`theme-toggle${loading ? " theme-toggle--loading" : ""}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-expanded={theme === "dark"}
      title={`Mudar para modo ${theme === "dark" ? "claro" : "escuro"}`}
      disabled={loading}
    >
      {loading ? (
        <span className="theme-toggle__spinner" aria-hidden="true" />
      ) : (
        theme === "dark" ? <Sun size={24} /> : <Moon size={24} />
      )}
    </button>
  );
};

export default ThemeToggle;
