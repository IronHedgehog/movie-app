import { useTheme } from "../../context/theme/useTheme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        rounded-lg
        border
        px-3
        py-1
        text-sm
        transition
        dark:border-zinc-700
        dark:bg-zinc-900
        dark:text-white
        hover:bg-zinc-100
        dark:hover:bg-zinc-800
      "
      aria-label="Toggle theme"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default ThemeToggle;
