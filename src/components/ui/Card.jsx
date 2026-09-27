import clsx from "clsx";
import { forwardRef, useRef } from "react";
import { m, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useFinePointer } from "../../hooks/useMediaQuery";

// Actualiza --x/--y para el efecto spotlight de `.spotlight`.
function trackPointer(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

export const Card = forwardRef(function Card({ as: Component = "div", className, children, onPointerMove, ...rest }, ref) {
  return (
    <Component
      ref={ref}
      onPointerMove={(e) => {
        trackPointer(e);
        onPointerMove?.(e);
      }}
      className={clsx(
        "spotlight glass rounded-[var(--radius-md)] transition-[border-color,background-color,box-shadow] duration-300",
        "can-hover:hover:border-line-strong",
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
});

// Tarjeta con inclinación 3D siguiendo al cursor (solo mouse).
export function TiltCard({ className, children, max = 6, ...rest }) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const enabled = fine && !reduce;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 200, damping: 20 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);

  return (
    <m.div
      ref={ref}
      style={enabled ? { rotateX, rotateY, transformPerspective: 900 } : undefined}
      onPointerMove={(e) => {
        trackPointer(e);
        if (!enabled) return;
        const rect = ref.current.getBoundingClientRect();
        px.set((e.clientX - rect.left) / rect.width);
        py.set((e.clientY - rect.top) / rect.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      className={clsx(
        "spotlight glass rounded-[var(--radius-md)] transition-[border-color,box-shadow] duration-300",
        "can-hover:hover:border-line-strong can-hover:hover:shadow-[0_30px_80px_-30px_rgb(var(--accent-rgb)/var(--glow-opacity))]",
        className,
      )}
      {...rest}
    >
      {children}
    </m.div>
  );
}
