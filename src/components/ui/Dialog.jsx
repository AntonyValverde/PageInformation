import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, m } from "motion/react";
import { useSmoothScroll } from "../../hooks/useSmoothScroll";

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Modal accesible: foco atrapado, Esc para cerrar, scroll del fondo bloqueado.
export function Dialog({ open, onClose, label, children, onKeyDown }) {
  const panelRef = useRef(null);
  const handlers = useRef({ onClose, onKeyDown });
  handlers.current = { onClose, onKeyDown };
  const { lock } = useSmoothScroll();

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    lock(true);

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handlers.current.onClose();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const nodes = [...panelRef.current.querySelectorAll(FOCUSABLE)];
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
      handlers.current.onKeyDown?.(e);
    };
    document.addEventListener("keydown", onKey);
    requestAnimationFrame(() => panelRef.current?.querySelector(FOCUSABLE)?.focus());

    return () => {
      document.removeEventListener("keydown", onKey);
      lock(false);
      previouslyFocused?.focus?.();
    };
  }, [open, lock]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="relative z-10 flex max-h-full w-full max-w-5xl flex-col"
          >
            {children}
          </div>
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
