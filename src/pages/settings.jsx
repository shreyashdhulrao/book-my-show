import React, { useEffect, useState } from "react";
import Theme from "../assets/icons/theme.svg?react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const html = document.documentElement;

    if (darkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 
                 text-zinc-800 dark:text-white
                  transition-all duration-300"
    >
      {darkMode ? (
        <Theme className="w-6 h-6 text-white"  /> 
      ) : (
        <Theme className="w-6 h-6" />
      )}
    </button>
  );
}