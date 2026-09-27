import { useId } from "react";
import { m } from "motion/react";

const PATHS = ["M3.5 25 9.5 7 15.5 25", "M5.9 18.5h7.2", "M16.5 7 22.5 25 28.5 7"];

// Monograma "AV". Con `draw` los trazos se dibujan al montar.
export function Monogram({ className, draw = false, strokeWidth = 2.6 }) {
  const id = useId();
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="3" y1="7" x2="29" y2="25">
          <stop offset="0" stopColor="var(--accent-soft)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {PATHS.map((d, i) =>
          draw ? (
            <m.path
              key={d}
              d={d}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.65, 0, 0.35, 1] }}
            />
          ) : (
            <path key={d} d={d} />
          ),
        )}
      </g>
    </svg>
  );
}
