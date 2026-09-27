import clsx from "clsx";
import { AnimatePresence, m } from "motion/react";
import { FaMoon, FaSun } from "../ui/icons";
import { useTheme } from "../../hooks/useTheme";

export function ThemeToggle({ className }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
      title={dark ? "Tema claro" : "Tema oscuro"}
      className={clsx(
        "relative grid size-11 place-items-center overflow-hidden rounded-full border border-line text-fg transition-colors duration-300",
        "can-hover:hover:border-line-strong can-hover:hover:bg-surface-hover",
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <m.span
          key={theme}
          initial={{ y: 20, rotate: -90, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -20, rotate: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {dark ? <FaMoon size={16} /> : <FaSun size={17} />}
        </m.span>
      </AnimatePresence>
    </button>
  );
}
