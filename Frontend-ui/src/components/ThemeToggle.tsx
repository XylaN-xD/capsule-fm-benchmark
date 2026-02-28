import { useState, useEffect } from "react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setIsDark(false);
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggle = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.remove("light");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.add("light");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  return (
    <button
      onClick={toggle}
      className="relative group flex items-center gap-2 h-9 px-1 rounded-full border border-border/60 bg-surface-raised transition-all duration-500 hover:border-primary/30"
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {/* Track background glow */}
      <div className={`absolute inset-0 rounded-full transition-all duration-700 ${
        isDark ? "bg-primary/5" : "bg-primary/10"
      }`} />

      {/* Sliding indicator */}
      <div
        className={`relative z-10 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-500 ${
          isDark
            ? "translate-x-0 bg-card border border-primary/30 shadow-[0_0_12px_-2px_hsl(var(--primary)/0.4)]"
            : "translate-x-7 bg-card border border-border shadow-lg"
        }`}
      >
        {isDark ? (
          /* Moon icon */
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary">
            <path
              d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          /* Sun icon */
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-primary">
            <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </div>

      {/* Power indicator LED */}
      <div className={`relative z-10 w-7 h-7 flex items-center justify-center transition-all duration-500 ${
        isDark ? "opacity-30" : "opacity-100"
      }`}>
        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
          isDark ? "bg-muted-foreground" : "bg-primary shadow-[0_0_8px_hsl(var(--primary)/0.6)]"
        }`} />
      </div>

      {/* Label */}
      <span className="relative z-10 font-mono text-[9px] tracking-widest text-muted-foreground uppercase pr-2 hidden sm:block">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
};

export default ThemeToggle;
