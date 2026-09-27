import { useEffect, useRef } from "react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";

const LINK = 130; // distancia máxima para unir dos nodos
const LINK2 = LINK * LINK;
const POINTER_R = 190; // radio de influencia del cursor
const POINTER_R2 = POINTER_R * POINTER_R;
const MAX_SPEED = 4;
const BUCKETS = 4; // niveles de opacidad para agrupar trazos

function readColors() {
  const s = getComputedStyle(document.documentElement);
  return {
    fg: s.getPropertyValue("--fg-rgb").trim(),
    a: s.getPropertyValue("--accent-rgb").trim(),
    b: s.getPropertyValue("--accent-2-rgb").trim(),
    light: document.documentElement.dataset.theme === "light",
  };
}

function maxParticles(width) {
  if (width < 640) return 40;
  if (width < 1024) return 70;
  return 120;
}

function makeParticle(w, h) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.12 + Math.random() * 0.22;
  const vx = Math.cos(angle) * speed;
  const vy = Math.sin(angle) * speed;
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx,
    vy,
    bvx: vx,
    bvy: vy,
    r: 0.8 + Math.random() * 1.5,
    tone: Math.random() < 0.6 ? "a" : "b",
  };
}

export default function InteractiveBackground() {
  const canvasRef = useRef(null);
  const gridRef = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const auroraY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let w = 0;
    let h = 0;
    let particles = [];
    let colors = readColors();
    let raf = 0;
    let running = false;
    let last = 0;
    let limit = Infinity; // se reduce si el dispositivo no mantiene los fps
    let slowFrames = 0;
    let scrollDelta = 0;
    let lastScroll = window.scrollY;
    const pointer = { x: -9999, y: -9999, active: false };
    const ripples = [];
    let touchTimer = 0;

    const targetCount = () => Math.min(limit, maxParticles(w), Math.round((w * h) / 12000));

    function resize() {
      const rect = canvas.getBoundingClientRect();
      if (Math.round(rect.width) === w && Math.abs(rect.height - h) < 2) return;
      w = Math.round(rect.width);
      h = Math.round(rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      syncCount();
      if (!running) draw(performance.now());
    }

    function syncCount() {
      const n = targetCount();
      if (particles.length > n) particles.length = n;
      while (particles.length < n) particles.push(makeParticle(w, h));
    }

    function step(dt, now) {
      // Parallax: los nodos se desplazan con el scroll según su "profundidad"
      const shift = scrollDelta * 0.06;
      scrollDelta = 0;

      for (let i = ripples.length - 1; i >= 0; i--) {
        // El timestamp del frame puede ser anterior al del click: se limita a 0
        const t = Math.max(0, (now - ripples[i].start) / 900);
        if (t >= 1) ripples.splice(i, 1);
        else {
          ripples[i].t = t;
          ripples[i].radius = t * 420;
        }
      }

      for (const p of particles) {
        p.vx += (p.bvx - p.vx) * 0.02 * dt;
        p.vy += (p.bvy - p.vy) * 0.02 * dt;

        if (pointer.active) {
          const dx = pointer.x - p.x;
          const dy = pointer.y - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < POINTER_R2) {
            const d = Math.sqrt(d2) || 1;
            const f = 1 - d / POINTER_R;
            // Atrae desde lejos y repele muy cerca para que no se amontonen
            const pull = d > 70 ? 0.05 : -0.14;
            p.vx += (dx / d) * f * pull * dt;
            p.vy += (dy / d) * f * pull * dt;
          }
        }

        for (const r of ripples) {
          const dx = p.x - r.x;
          const dy = p.y - r.y;
          const d = Math.sqrt(dx * dx + dy * dy) || 1;
          const band = Math.abs(d - r.radius);
          if (band < 60) {
            const push = (1 - band / 60) * (1 - r.t) * 0.9;
            p.vx += (dx / d) * push * dt;
            p.vy += (dy / d) * push * dt;
          }
        }

        const speed = Math.hypot(p.vx, p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt - shift * (0.4 + p.r / 2.3);

        if (p.x < -20) p.x = w + 20;
        else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        else if (p.y > h + 20) p.y = -20;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const base = colors.light ? 0.2 : 0.24;

      // Grid espacial: solo se comparan nodos de celdas vecinas
      const cols = Math.ceil(w / LINK) + 2;
      const cells = new Map();
      particles.forEach((p, i) => {
        const key = (Math.floor(p.y / LINK) + 1) * cols + Math.floor(p.x / LINK) + 1;
        const cell = cells.get(key);
        if (cell) cell.push(i);
        else cells.set(key, [i]);
      });

      const normal = Array.from({ length: BUCKETS }, () => new Path2D());
      const glow = Array.from({ length: BUCKETS }, () => new Path2D());

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const cx = Math.floor(p.x / LINK) + 1;
        const cy = Math.floor(p.y / LINK) + 1;
        for (let oy = -1; oy <= 1; oy++) {
          for (let ox = -1; ox <= 1; ox++) {
            const cell = cells.get((cy + oy) * cols + cx + ox);
            if (!cell) continue;
            for (const j of cell) {
              if (j <= i) continue;
              const q = particles[j];
              const dx = p.x - q.x;
              const dy = p.y - q.y;
              const d2 = dx * dx + dy * dy;
              if (d2 > LINK2) continue;
              const strength = 1 - Math.sqrt(d2) / LINK;
              const bucket = Math.min(BUCKETS - 1, Math.floor(strength * BUCKETS));
              let target = normal;
              if (pointer.active) {
                const mx = (p.x + q.x) / 2 - pointer.x;
                const my = (p.y + q.y) / 2 - pointer.y;
                if (mx * mx + my * my < POINTER_R2) target = glow;
              }
              target[bucket].moveTo(p.x, p.y);
              target[bucket].lineTo(q.x, q.y);
            }
          }
        }
      }

      ctx.lineWidth = colors.light ? 0.8 : 1;
      for (let b = 0; b < BUCKETS; b++) {
        const level = (b + 1) / BUCKETS;
        ctx.strokeStyle = `rgb(${colors.a} / ${level * base})`;
        ctx.stroke(normal[b]);
        ctx.strokeStyle = `rgb(${colors.b} / ${Math.min(1, level * base * 3)})`;
        ctx.stroke(glow[b]);
      }

      // Hilos del cursor hacia los nodos cercanos
      if (pointer.active) {
        for (const p of particles) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < POINTER_R2) {
            const alpha = (1 - Math.sqrt(d2) / POINTER_R) * (colors.light ? 0.45 : 0.55);
            ctx.strokeStyle = `rgb(${colors.b} / ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(pointer.x, pointer.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }

      // Nodos
      const dotsA = new Path2D();
      const dotsB = new Path2D();
      for (const p of particles) {
        const path = p.tone === "a" ? dotsA : dotsB;
        path.moveTo(p.x + p.r, p.y);
        path.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      }
      const dotAlpha = colors.light ? 0.55 : 0.75;
      ctx.fillStyle = `rgb(${colors.a} / ${dotAlpha})`;
      ctx.fill(dotsA);
      ctx.fillStyle = `rgb(${colors.b} / ${dotAlpha})`;
      ctx.fill(dotsB);

      // Ondas de click
      for (const r of ripples) {
        ctx.strokeStyle = `rgb(${colors.b} / ${(1 - r.t) * 0.35})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function frame(now) {
      const elapsed = now - last;
      last = now;
      const dt = Math.min(elapsed / 16.667, 3);

      // Si se sostienen frames lentos (< ~45 fps), reducimos nodos
      if (elapsed > 22) slowFrames++;
      else slowFrames = Math.max(0, slowFrames - 1);
      if (slowFrames > 90 && particles.length > 24) {
        limit = Math.max(24, Math.floor(particles.length * 0.8));
        syncCount();
        slowFrames = 0;
      }

      step(dt, now);
      draw(now);
      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || reduce || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    // --- Eventos ---
    const onPointerMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
      if (e.pointerType !== "mouse") {
        clearTimeout(touchTimer);
        touchTimer = setTimeout(() => (pointer.active = false), 900);
      }
      if (finePointer && gridRef.current) {
        gridRef.current.style.setProperty("--mx", `${e.clientX}px`);
        gridRef.current.style.setProperty("--my", `${e.clientY}px`);
      }
    };
    const onPointerDown = (e) => {
      onPointerMove(e);
      ripples.push({ x: e.clientX, y: e.clientY, start: performance.now(), t: 0, radius: 0 });
      if (ripples.length > 4) ripples.shift();
    };
    const onLeave = () => (pointer.active = false);
    const onScroll = () => {
      scrollDelta += window.scrollY - lastScroll;
      lastScroll = window.scrollY;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      colors = readColors();
      if (!running) draw(performance.now());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    resize();

    // La animación arranca cuando el navegador queda libre, para no competir con la carga inicial.
    let idleHandle = 0;
    if (!reduce) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerdown", onPointerDown, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("blur", onLeave);
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      idleHandle = window.requestIdleCallback
        ? window.requestIdleCallback(start, { timeout: 2500 })
        : window.setTimeout(start, 1200);
    }

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleHandle);
      else clearTimeout(idleHandle);
      stop();
      clearTimeout(touchTimer);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduce]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Aurora */}
      <m.div style={{ y: reduce ? 0 : auroraY }} className="absolute -inset-x-[10%] -top-[10%] h-[140lvh]">
        <div className="animate-aurora-1 absolute top-[-10%] left-[-10%] h-[55vmax] w-[55vmax] rounded-full bg-accent opacity-[0.22] blur-[120px] light:opacity-[0.14]" />
        <div className="animate-aurora-2 absolute top-[30%] right-[-15%] h-[50vmax] w-[50vmax] rounded-full bg-accent-2 opacity-[0.14] blur-[130px] light:opacity-[0.12]" />
        <div className="animate-aurora-3 absolute bottom-[-5%] left-[20%] h-[40vmax] w-[40vmax] rounded-full bg-[#a855f7] opacity-[0.1] blur-[120px] light:opacity-[0.07]" />
      </m.div>

      {/* Rejilla de puntos revelada alrededor del cursor */}
      <div
        ref={gridRef}
        className="absolute inset-0 hidden can-hover:block"
        style={{
          backgroundImage: "radial-gradient(rgb(var(--fg-rgb) / 0.22) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(260px circle at var(--mx, -500px) var(--my, -500px), #000, transparent 70%)",
          WebkitMaskImage: "radial-gradient(260px circle at var(--mx, -500px) var(--my, -500px), #000, transparent 70%)",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-x-0 top-0 h-lvh w-full" />

      {/* Viñeta para que el contenido siempre tenga buen contraste */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--bg)_100%)] opacity-70" />
      <div className="grain absolute inset-0" />
    </div>
  );
}
