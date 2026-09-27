import clsx from "clsx";
import { useRef } from "react";
import { m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useFinePointer } from "../../hooks/useMediaQuery";

const variants = {
  primary:
    "bg-brand text-white shadow-[0_10px_40px_-12px_rgb(var(--accent-rgb)/0.7)] can-hover:hover:shadow-[0_14px_50px_-10px_rgb(var(--accent-rgb)/0.9)]",
  secondary: "glass text-fg can-hover:hover:bg-surface-hover can-hover:hover:border-line-strong",
  ghost: "text-muted can-hover:hover:text-fg can-hover:hover:bg-surface",
};

const sizes = {
  sm: "h-10 px-4 text-sm gap-2",
  md: "h-12 px-6 text-[0.95rem] gap-2.5",
  lg: "h-14 px-7 text-base gap-3",
};

// Botón o enlace. Con `magnetic` sigue levemente al cursor.
export function Button({
  href,
  variant = "primary",
  size = "md",
  magnetic = false,
  className,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const enabled = magnetic && fine && !reduce;

  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 18, mass: 0.4 });

  const onPointerMove = (e) => {
    if (!enabled) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 16);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 16);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const Component = href ? m.a : m.button;
  const external = href && /^https?:/.test(href);

  return (
    <Component
      ref={ref}
      href={href}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...(!href && { type: rest.type ?? "button" })}
      style={enabled ? { x, y } : undefined}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      whileTap={{ scale: 0.97 }}
      className={clsx(
        "relative inline-flex shrink-0 items-center justify-center rounded-full font-medium whitespace-nowrap",
        "transition-[background-color,border-color,color,box-shadow] duration-300",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}
