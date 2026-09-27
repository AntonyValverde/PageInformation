import { m } from "motion/react";

export const EASE = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const stagger = (delayChildren = 0, staggerChildren = 0.07) => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

const viewport = { once: true, amount: 0.2 };

// Aparece al entrar en pantalla (una sola vez).
export function Reveal({ as = "div", delay = 0, className, children, ...rest }) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: fadeUp.hidden,
        show: { ...fadeUp.show, transition: { ...fadeUp.show.transition, delay } },
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}

// Contenedor que escalona la entrada de sus hijos <RevealItem>.
export function RevealGroup({ as = "div", className, children, delay = 0, gap = 0.07, amount = 0.15, ...rest }) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={stagger(delay, gap)}
      {...rest}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ as = "div", className, children, ...rest }) {
  const Component = m[as];
  return (
    <Component className={className} variants={fadeUp} {...rest}>
      {children}
    </Component>
  );
}
