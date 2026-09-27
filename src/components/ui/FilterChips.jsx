import clsx from "clsx";
import { m } from "motion/react";

// Grupo de filtros con una píldora activa que se desliza entre opciones.
export function FilterChips({ options, value, onChange, layoutId, label }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(opt.id)}
            className={clsx(
              "relative isolate min-h-11 rounded-full border px-4 text-sm font-medium transition-colors duration-300",
              active ? "border-transparent text-white" : "border-line text-muted can-hover:hover:text-fg can-hover:hover:border-line-strong",
            )}
          >
            {active && (
              <m.span
                layoutId={layoutId}
                className="absolute inset-0 -z-10 rounded-full bg-brand"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            {opt.label}
            {opt.count != null && <span className={clsx("ml-1.5 font-mono text-xs", active ? "text-white/80" : "text-muted")}>{opt.count}</span>}
          </button>
        );
      })}
    </div>
  );
}
