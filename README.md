# Portafolio — Antony Valverde

Sitio personal de una sola página: presentación, stack, especialidades, proyectos (sincronizados desde GitHub), servicios con precios, certificaciones y contacto.

**Stack:** Vite · React 19 · Tailwind CSS v4 · Motion · Lenis · react-icons. Se publica en Vercel.

## Scripts

| Comando | Qué hace |
|---|---|
| `npm start` / `npm run dev` | Servidor de desarrollo en `http://localhost:5173` |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build de producción |
| `npm run optimize:images` | Regenera las imágenes de `public/` (WebP, favicon, imagen OG) a partir de `assets/originals/` |
| `npm run capture:projects` | Captura la demo de cada repo con `homepage` y actualiza `src/data/projectPreviews.json` (requiere Chrome o Edge; usa `CHROME_PATH` para otra ruta) |
| `npm run generate:icons` | Regenera `src/components/ui/icons.js` (íconos de la carga inicial) |

## Dónde editar el contenido

Todo el texto vive en `src/data/`:

- `profile.js`: nombre, roles, bio, contacto, redes y enlaces del menú
- `stack.js`: tecnologías y categorías del filtro
- `skills.js`: especialidades (bento)
- `services.js`: servicios, precios y desglose
- `education.js`: títulos universitarios (imágenes en `assets/originals/degrees/`; el script tapa el número de identificación)
- `certificates.js`: cursos y certificados (imágenes en `assets/originals/certificates/`; luego `npm run optimize:images`)
- `projects.js`: repos destacados, repos ocultos y títulos/descripciones curados

Los colores, tipografías y animaciones base están en `src/index.css` (tokens en `:root` y `[data-theme="light"]`).

## Estructura

```
src/
  data/                   contenido
  hooks/                  tema, scroll suave, scroll-spy, GitHub (con caché), media queries
  lib/                    formato de fechas y nombres, colores de lenguajes, carga diferida de Motion
  components/
    background/           fondo interactivo (canvas + aurora + rejilla + grano)
    layout/               navbar, menú móvil, intro, footer, cambio de tema
    sections/             Hero y secciones (BelowFold se carga en un chunk aparte)
    ui/                   Button, Card, Dialog, Reveal, FilterChips, Monogram, íconos
scripts/                  optimización de imágenes, capturas de proyectos, íconos
assets/originals/         imágenes fuente (no se publican)
```

## Accesibilidad y rendimiento

- Respeta `prefers-reduced-motion`: sin intro, fondo estático y animaciones reducidas.
- Navegación por teclado, foco visible, modal con foco atrapado y cierre con `Esc`.
- La carga inicial trae solo el Hero; el resto de secciones, Lenis y las funciones de animación de Motion se cargan aparte.
