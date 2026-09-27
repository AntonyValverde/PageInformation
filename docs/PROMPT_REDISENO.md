# PROMPT — Rediseño completo del portafolio de Antony Valverde

> Copia todo lo que está debajo de la línea y pégalo a un agente de código (Claude Code u otro) abierto en la raíz de este repositorio.
> Antes de usarlo, completa los campos marcados con `⟪COMPLETAR⟫` en la sección 9.

---

## 0. Rol y objetivo

Actúa como **diseñador de producto senior + ingeniero frontend especializado en motion design y rendimiento web**.

Tu tarea es **rediseñar y reconstruir por completo** el portafolio personal de Antony Valverde (Ingeniero en Sistemas, Costa Rica) que vive en este repositorio. El resultado debe sentirse como un portafolio de nivel Awwwards: identidad visual fuerte, animaciones fluidas con sentido, fondo interactivo, y una experiencia impecable en **monitores grandes (≥1440 px), laptops (1024–1439 px), tablets (640–1023 px) y móviles (360–639 px)**.

Reglas generales:
- **Conserva todo el contenido real** existente (textos, precios, enlaces, certificados, datos de contacto). No inventes datos: donde falte información usa los valores de la sección 9 o deja un `TODO:` visible en el código.
- Todo el sitio en **español**.
- Lee primero todos los archivos de `src/` y `public/` para entender el contenido antes de escribir código.
- Trabaja por fases (sección 10) y verifica cada fase antes de pasar a la siguiente.

---

## 1. Diagnóstico del diseño actual (lo que hay que corregir)

**Stack actual:** Create React App 5 + React 18 + Tailwind 3.4 + AOS + react-icons. Una sola página (`src/App.js`).

### 1.1 Estructura y jerarquía
- El sitio es una **pila vertical de 8 tarjetas idénticas** (`Section.js`: `bg-gray-800/50 border rounded-2xl p-8`). No hay ritmo visual, ni jerarquía, ni punto focal: todo pesa lo mismo.
- **No existe navegación.** El usuario no puede saltar a Proyectos o Contacto; tiene que hacer scroll por todo.
- El **header** dice "Información Personal / Portafolio profesional": genérico, no muestra el nombre ni el rol.
- El **hero** (`ProfileCard`) es débil: foto de 160 px, texto cortado con "..." (placeholder sin terminar), sin CTA, sin nombre visible. Además está envuelto en un `<nav>` (semántica incorrecta) y hay un `<header>` dentro de otro `<header>`.
- **Contenido redundante:** redes sociales aparecen en su propia sección y otra vez en el footer; "Mis Servicios" repite exactamente los títulos de "Desglose de Precios"; `LanguagesGrid` y `DatabasesGrid` son el mismo componente duplicado.
- **Orden poco estratégico:** los proyectos (lo más valioso para un reclutador) están casi al final, debajo de precios y redes sociales.

### 1.2 Sistema visual
- **Modo claro roto:** `Section`, `ProfileCard`, `PageHead` y `Footer` tienen fondo oscuro fijo (`bg-gray-800/50`) y títulos `text-indigo-400` sin variante clara, mientras sus hijos usan `bg-white` en modo claro → tarjetas blancas sobre paneles grises semitransparentes, contraste inconsistente.
- **Contraste insuficiente:** en el hero el párrafo usa `text-gray-700` sobre fondo oscuro; íconos como C (`text-blue-700`) u Oracle (`text-red-600`) casi desaparecen sobre `gray-800`.
- **Sin tipografía propia:** fuente del sistema, sin escala tipográfica. `App.css` referencia `Josefin_Sans`, que nunca se carga.
- **Sin tokens de diseño:** colores, radios y sombras repetidos a mano en cada componente; `tailwind.config.js` sin `theme.extend`.
- **Paleta plana:** solo índigo + grises. Sin acento secundario, sin profundidad, sin textura.
- El tema solo sigue al sistema operativo; no hay botón para cambiarlo.

### 1.3 Componentes
- **Habilidades y Servicios:** listas planas de 10 y 6 filas con el mismo check; aburridas y sin íconos significativos.
- **Precios:** tarjetas apiladas; `flex justify-between` del título y precio se rompe en móvil con títulos largos; el botón "Mostrar más" oculta 4 de 6 servicios.
- **Proyectos (GitHub):** trae hasta 100 repos sin filtrar (incluye forks y el repo README del perfil); cada tarjeta repite el mismo avatar y usuario (información inútil) y **no muestra descripción, estrellas ni fecha**. Sin filtros, sin destacados, sin skeletons. Sin caché → límite de 60 peticiones/hora de la API.
- **Certificados:** solo botones de texto; las imágenes quedan escondidas detrás de un modal. No hay miniaturas, emisor ni fecha.
- **Modal:** no cierra con `Esc`, no atrapa el foco, sin `role="dialog"`/`aria-modal`, no bloquea el scroll del body.
- **Footer:** teléfono y correo no son clicables (`tel:` / `mailto:`); íconos sociales sin `aria-label`.

### 1.4 Animaciones
- Doble sistema de entrada (AOS **y** clases `animate-fade-in`) en los mismos elementos.
- `hover:scale` aplicado a absolutamente todo (incluso a elementos no interactivos) → el hover pierde significado.
- No hay respeto a `prefers-reduced-motion` salvo en el CSS muerto del logo de CRA.
- Sin fondo, sin microinteracciones, sin feedback de scroll.

### 1.5 Técnico / SEO / limpieza
- `public/index.html`: `lang="en"`, título "Página Informativa", meta description por defecto de CRA, `theme-color #000`, sin Open Graph ni Twitter cards, `manifest.json` genérico.
- Código muerto: casi todo `App.css` (`.mi-boton`, `.carousel-*`, `.PageFooter`, `.precios`, etc.), `src/components/curses.js` y `src/components/titulos.js` (no se usan y apuntan a PDFs inexistentes), `src/logo.svg`.
- CRA está oficialmente deprecado.

---

## 2. Stack objetivo

Migrar a:

| Pieza | Elección | Motivo |
|---|---|---|
| Build | **Vite** + React 19 (JS o TS, preferible TS) | CRA deprecado; arranque y HMR instantáneos |
| Estilos | **Tailwind CSS v4** con tokens en `@theme` (CSS-first) | Tokens centralizados, modo claro/oscuro limpio |
| Animación de componentes | **Motion** (`motion/react`, ex Framer Motion) | Reveals, layout animations, gestos, `useReducedMotion` |
| Scroll suave | **Lenis** | Scroll inercial en desktop; desactivado en touch y con reduced motion |
| Fondo interactivo | **Canvas 2D propio** (sin librería) | Control total, ligero, fácil de pausar |
| Íconos | `react-icons` (se mantiene) | Ya está en el proyecto |
| Utilidades | `clsx` | Clases condicionales |

- **Eliminar AOS.** Todas las animaciones pasan por Motion.
- No agregues más dependencias sin justificarlo en un comentario del PR.
- Mantén scripts `dev`, `build`, `preview`. `public/` se conserva (foto y certificados).

---

## 3. Dirección de arte

**Concepto:** *"Ingeniería en la oscuridad"* — interfaz tipo consola/sistema premium: fondo casi negro con una red de nodos viva (metáfora de redes, bases de datos y sistemas), acentos de luz índigo → cian, tipografía geométrica grande y detalles monoespaciados como etiquetas técnicas.

**Dark mode es el tema por defecto**; el modo claro debe existir, verse igual de cuidado y activarse por preferencia del sistema o con un toggle.

### 3.1 Tokens de color (definir como variables CSS en `@theme` + override para claro)

| Token | Oscuro (default) | Claro |
|---|---|---|
| `--color-bg` | `#07080D` | `#F6F7FB` |
| `--color-bg-elevated` | `#0D0F17` | `#FFFFFF` |
| `--color-surface` | `rgb(255 255 255 / 0.03)` | `rgb(13 16 32 / 0.02)` |
| `--color-surface-hover` | `rgb(255 255 255 / 0.06)` | `rgb(13 16 32 / 0.05)` |
| `--color-border` | `rgb(255 255 255 / 0.08)` | `#E2E5EE` |
| `--color-text` | `#E9EBF3` | `#0D1020` |
| `--color-text-muted` | `#9CA2B8` | `#586079` |
| `--color-accent` | `#6366F1` (índigo) | `#4F46E5` |
| `--color-accent-2` | `#22D3EE` (cian) | `#0891B2` |
| `--color-success` | `#34D399` | `#059669` |
| `--gradient-brand` | `linear-gradient(120deg, accent, accent-2)` | igual con valores claros |

- Todo texto debe cumplir **WCAG AA** (4.5:1 texto normal, 3:1 texto grande) en ambos temas. Verifícalo.
- Los íconos de marca de tecnologías se muestran **monocromos** (`text-muted`) y toman su color de marca solo en hover/focus; así se evita el problema de contraste actual.

### 3.2 Tipografía (Google Fonts, `font-display: swap`, precargar las de hero)
- **Display / títulos:** `Space Grotesk` 500–700.
- **Texto:** `Inter` 400–600.
- **Mono / etiquetas técnicas:** `JetBrains Mono` 400–500 (ej. `// 01 — Proyectos`, badges, fechas).

Escala fluida con `clamp()`:

| Rol | Tamaño |
|---|---|
| Display (nombre en hero) | `clamp(2.75rem, 1rem + 7vw, 7rem)`, `line-height 0.95`, `letter-spacing -0.03em` |
| H2 sección | `clamp(2rem, 1rem + 3.5vw, 3.75rem)` |
| H3 tarjeta | `clamp(1.25rem, 1rem + 0.8vw, 1.625rem)` |
| Cuerpo | `clamp(1rem, 0.95rem + 0.2vw, 1.125rem)`, `line-height 1.65`, máx. `65ch` |
| Etiqueta mono | `0.75rem–0.8125rem`, `uppercase`, `letter-spacing 0.12em` |

### 3.3 Espaciado, radios, sombras
- Contenedor: `max-width 1200px` para texto, `1440px` para grids/bento; gutter lateral `clamp(1rem, 4vw, 2.5rem)`.
- Separación entre secciones: `padding-block: clamp(5rem, 10vw, 9rem)`.
- Radios: `--radius-sm 10px`, `--radius-md 18px`, `--radius-lg 28px`.
- Superficies: *glassmorphism* sutil (`backdrop-blur-md`, borde 1 px `--color-border`, fondo `--color-surface`), nunca fondos grises sólidos.
- Sombras: en oscuro usar **glow** de acento muy tenue en hover (`0 0 0 1px accent/30%, 0 20px 60px -20px accent/35%`); en claro sombras suaves normales.
- Textura: overlay de ruido/grano global (SVG `feTurbulence`, opacidad 3–5 %) para dar profundidad.

### 3.4 Tokens de movimiento
- Duraciones: `150ms` (micro), `300ms` (UI), `600ms` (reveal), `900ms` (hero).
- Easing principal: `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out). Spring de Motion para gestos: `{ stiffness: 300, damping: 30 }`.
- Stagger entre hijos: `60–80ms`.

---

## 4. Fondo interactivo (pieza estrella)

Componente `src/components/background/InteractiveBackground.jsx`, fijo detrás de todo (`position: fixed; inset: 0; z-index: -1; pointer-events: none`), con 4 capas:

1. **Base:** color `--color-bg`.
2. **Aurora:** 2–3 manchas de gradiente (índigo, cian, violeta) muy desenfocadas (`blur(120px)`), animadas en CSS con movimiento lento (20–30 s, `transform` solamente). Se desplazan ligeramente con el scroll (parallax 0.1–0.2).
3. **Red de nodos (canvas 2D):**
   - Partículas que derivan lentamente; se unen con líneas cuya opacidad depende de la distancia (umbral ~120 px).
   - Cantidad según área: `min(area / 12000, 120)` en desktop, máx. **40** en móvil, **70** en tablet.
   - **Cursor:** en un radio de ~180 px los nodos se atraen suavemente al puntero y las líneas cercanas se iluminan con el gradiente de marca.
   - **Click / tap:** onda expansiva (ripple) que empuja los nodos y se desvanece en ~800 ms.
   - **Touch:** sigue el último punto de toque; sin giroscopio (evita el prompt de permisos de iOS).
   - Colores leídos de las variables CSS → cambia automáticamente con el tema.
4. **Máscara de rejilla de puntos** (dot grid CSS con `mask-image: radial-gradient(...)`) que aparece alrededor del cursor en desktop.

**Requisitos de rendimiento obligatorios:**
- `devicePixelRatio` limitado a 2; redimensionar con `ResizeObserver` + debounce.
- `requestAnimationFrame` pausado con `document.visibilitychange` y cuando la pestaña no está visible.
- Búsqueda de vecinos con **grid espacial** (no O(n²) ingenuo si n > 60).
- Mantener 60 fps en una laptop media y ≥ 45 fps en un móvil de gama media. Si el tiempo por frame supera 20 ms de forma sostenida, reducir partículas automáticamente.
- Con `prefers-reduced-motion: reduce`: dibujar **un solo frame estático** y desactivar aurora animada.

---

## 5. Arquitectura de información (nuevo orden)

Una sola página con anclas. Orden:

| # | Sección (id) | Contenido | Viene de |
|---|---|---|---|
| — | **Navbar** | Logo/monograma "AV", enlaces a secciones, toggle de tema, CTA "Contactar" | nuevo |
| 01 | **Hero** (`#inicio`) | Nombre, rol rotativo, bio corta, CTAs, foto, redes, badge de disponibilidad | `PageHead` + `ProfileCard` + `SocialLinks` |
| 02 | **Sobre mí** (`#sobre-mi`) | Bio extendida + 4 métricas con contador | `ProfileCard` (texto) |
| 03 | **Stack** (`#stack`) | Lenguajes + bases de datos + herramientas, filtrable por categoría + marquee de logos | `LanguagesGrid` + `DatabasesGrid` |
| 04 | **Especialidades** (`#especialidades`) | Las 10 habilidades como bento grid con íconos | `SkillsList` |
| 05 | **Proyectos** (`#proyectos`) | Destacados + grid filtrable desde GitHub | `ProjectsGrid` + `profile.js` |
| 06 | **Servicios y precios** (`#servicios`) | Los 6 servicios con precio y desglose | `ServicesList` + `Pricing` (fusionados) |
| 07 | **Certificaciones** (`#certificaciones`) | Galería con miniaturas + lightbox | `CertificatesGallery` |
| 08 | **Contacto** (`#contacto`) | Tarjetas de contacto + CTA grande + redes | `Footer` (datos) |
| — | **Footer** | Mini footer, volver arriba, © año | `Footer` |

Cada sección abre con un encabezado consistente: etiqueta mono (`// 05 — Proyectos`), H2 grande con una palabra resaltada en gradiente, y una línea de subtítulo en `text-muted`.

---

## 6. Especificación por sección

### 6.1 Navbar
- Fija arriba. Transparente sobre el hero; al hacer scroll > 40 px pasa a *glass* (`backdrop-blur`, borde inferior) y reduce su altura (72 → 60 px) con transición.
- Se oculta al bajar y reaparece al subir (en móvil y tablet).
- **Scroll-spy:** el enlace de la sección activa tiene un indicador que se desliza entre enlaces (`layoutId` de Motion).
- **Barra de progreso de scroll** de 2 px con el gradiente de marca en el borde superior.
- Toggle de tema con ícono sol/luna animado; el cambio usa **View Transitions API** con revelado circular desde el botón (con fallback a transición de color si no hay soporte). Persistir la elección en `localStorage` (con `try/catch`); por defecto, seguir al sistema.
- **Móvil/tablet (< 1024 px):** botón hamburguesa (se transforma en X) que abre un menú **a pantalla completa** con los enlaces grandes entrando en stagger, redes sociales abajo y toggle de tema. Bloquea el scroll del body; cierra con `Esc`, al tocar un enlace o el fondo.
- Enlace "Saltar al contenido" visible con foco (accesibilidad).

### 6.2 Hero
- Alto `100svh` (usar `svh` para evitar el salto de la barra del navegador móvil), contenido centrado verticalmente.
- **Desktop/laptop:** 2 columnas (texto 7/12, foto 5/12). **Tablet:** 2 columnas más compactas o foto arriba. **Móvil:** foto arriba (≈ 160–200 px), texto centrado debajo.
- Contenido:
  - Badge con punto verde pulsante: "Disponible para proyectos" (configurable).
  - Saludo mono pequeño: `Hola, soy`.
  - **Nombre "Antony Valverde"** en tamaño display; animación de entrada letra por letra o palabra por palabra (máscara + `translateY`), stagger 40 ms.
  - Rol rotativo con efecto de escritura o de "text scramble": *Ingeniero en Sistemas → Desarrollador Web → Desarrollador Móvil → Diseñador de Bases de Datos*.
  - Bio corta (2–3 líneas, ver sección 9).
  - CTAs: **"Ver proyectos"** (primario, gradiente) y **"Contactar"** (secundario, borde). Opcional **"Descargar CV"** si existe el PDF. Botones **magnéticos** en desktop (se desplazan hacia el cursor hasta 8 px).
  - Fila de íconos sociales (GitHub, LinkedIn, Instagram, Facebook) con `aria-label`.
- **Foto:** en un marco con **anillo de gradiente cónico que gira lentamente** y un halo de glow; tilt 3D leve siguiendo el cursor en desktop. Dos o tres "chips" flotantes alrededor con tecnologías del stack real (ej. `Java`, `Python`, `Dart`) que flotan con animación suave.
- Indicador "scroll" animado abajo (se oculta tras el primer scroll).

### 6.3 Sobre mí
- **Desktop:** texto a la izquierda, grid 2×2 de métricas a la derecha. **Móvil:** apilado, métricas en 2×2.
- Métricas con **contador animado** al entrar en viewport: años de experiencia, nº de repositorios públicos (dato real de la API de GitHub), nº de certificaciones (del array de datos), nº de tecnologías (del array de datos).
- Incluir universidad: Universidad Nacional de Costa Rica.

### 6.4 Stack técnico
- Fuente de datos única `src/data/stack.js` con categoría por ítem: **Lenguajes** (Java, Python, JavaScript, TypeScript, PHP, C, C++, C#, Dart), **Frontend** (HTML, CSS, Bootstrap; React solo si Antony lo confirma en `extraTools`), **Bases de datos** (Firebase, MongoDB, MariaDB, Oracle, MySQL), **Herramientas** (Git, Linux, etc. si aplica — ver sección 9).
- Chips de filtro por categoría ("Todos" por defecto); al filtrar, las tarjetas se reordenan con **layout animation** de Motion (`AnimatePresence` + `layout`).
- Tarjeta: ícono monocromo que toma su color de marca en hover, nombre, y efecto **spotlight** (gradiente radial que sigue al cursor dentro de la tarjeta, vía variables CSS `--x`/`--y`).
- Grid: 6 columnas en ≥1440, 5 en laptop, 4 en tablet, 3 en móvil (≥ 390 px) / 2 en móviles pequeños.
- Debajo, un **marquee infinito** de logos en dos filas en sentidos opuestos (se pausa en hover; estático con reduced motion).

### 6.5 Especialidades
- Las 10 habilidades actuales como **bento grid** con celdas de distinto tamaño; cada una con ícono propio (ej. `FaDatabase`, `FaGamepad`, `FaServer`, `FaGlobe`, `FaCode`, `FaNetworkWired`, `FaShieldAlt`, `FaBrain`, `FaMobileAlt`, `FaFolderOpen`) y una frase corta de apoyo.
- Las 2–3 más importantes ocupan celdas grandes (ej. Programación web, Desarrollo móvil, Bases de datos).
- Bento de 4 columnas en desktop, 2 en tablet, 1 en móvil (en móvil todas iguales).
- Reveal en stagger al entrar en viewport; borde animado con gradiente en hover.

### 6.6 Proyectos (GitHub)
Reescribir `useGithubRepos`:
- Excluir forks, archivados y el repo del perfil (`AntonyValverde/AntonyValverde`).
- **Caché** en `sessionStorage` por 30 min (con `try/catch`) para evitar el rate limit; si la API falla y hay caché, usar caché.
- Ordenar: primero los de `FEATURED_REPOS` (sección 9), luego por estrellas y fecha de actualización.

UI:
- **Proyectos destacados** (1–3): tarjetas grandes horizontales (desktop) con nombre, descripción, lenguaje, topics, estrellas, fecha y botones "Código" / "Demo". Si el repo tiene `homepage`, mostrar una vista previa (captura en `public/projects/<repo>.webp` si existe; si no, un placeholder generativo con el gradiente de marca y el nombre).
- **Grid del resto:** chips de filtro por lenguaje (generados dinámicamente de los datos), 3 columnas desktop / 2 tablet / 1 móvil, "Ver más" que carga de 6 en 6.
- **Tarjeta:** quitar avatar y usuario repetidos. Mostrar nombre formateado (`mi-repo_web` → "Mi Repo Web"), descripción (fallback "Sin descripción"), punto de color del lenguaje, ★ estrellas, fecha relativa ("actualizado hace 3 meses", `Intl.RelativeTimeFormat` en español), topics como chips, íconos de enlace.
- Hover desktop: **tilt 3D** (máx. 6°) + spotlight + elevación. En touch: sin tilt.
- **Skeletons** con shimmer mientras carga (no spinner). Estado de error con botón "Reintentar" y enlace al perfil de GitHub. Estado vacío amigable.
- CTA final "Ver todo en GitHub →".

### 6.7 Servicios y precios (fusionados)
- Una tarjeta por servicio (6): ícono, título, descripción de una línea, **precio destacado** ("Desde $1500" / "$20/hora"), y desglose expandible (acordeón animado con altura automática) con los ítems actuales.
- Marcar uno como **"Más solicitado"** (borde con gradiente animado); por defecto "Desarrollo de aplicaciones web".
- Nota visible: "Descuentos de hasta 30 % en servicios combinados".
- Botón "Solicitar cotización" en cada tarjeta → hace scroll a Contacto y prellena el asunto con el servicio (o abre `mailto:` con asunto prellenado).
- Grid 3 columnas desktop, 2 tablet, 1 móvil. En móvil el precio va **debajo** del título (arregla el overflow actual).
- Se eliminan el botón "Mostrar más" y la sección "Mis Servicios" separada.

### 6.8 Certificaciones
- Datos en `src/data/certificates.js`: `{ title, issuer, date, image, credentialUrl? }` para los 4 actuales (Linux Unhatched, Linux Essentials — Cisco NetAcad; Academic Process Mining Fundamentals, Celonis Foundations — Celonis). Fechas en sección 9.
- Grid de **miniaturas reales** con overlay de título/emisor al hover (en móvil el texto siempre visible debajo).
- **Lightbox** accesible: `role="dialog"`, `aria-modal`, foco atrapado, cierra con `Esc`/clic fuera/botón X, navegación con ← → y swipe en touch, contador "2 / 4", animación de apertura desde la miniatura (shared layout `layoutId`), bloqueo del scroll del body.
- Convertir imágenes a **WebP/AVIF** con versiones de miniatura (≈ 480 px) y completa; `loading="lazy"`, `width`/`height` explícitos. Renombrar archivos sin espacios (`academic-process-mining.webp`).

### 6.9 Contacto
- Titular grande tipo CTA: "¿Tienes un proyecto en mente? **Hablemos.**"
- Tarjetas: **Correo** (`mailto:` + botón "copiar" con toast "¡Copiado!"), **Teléfono / WhatsApp** (`tel:` y `https://wa.me/506XXXXXXXX`), **Ubicación** (Costa Rica), **Universidad** (Universidad Nacional de Costa Rica).
- Redes sociales como botones grandes con ícono + nombre.
- Formulario opcional (nombre, correo, mensaje) **solo si** se define un endpoint (Formspree u otro) en la sección 9; si no, omitirlo. Si se incluye: validación en cliente, estados enviando/éxito/error, `aria-live`.

### 6.10 Footer
- Una línea: monograma, "© {año} Antony Valverde. Hecho con React.", enlaces rápidos y botón "Volver arriba" (scroll suave).

---

## 7. Catálogo de animaciones e interacciones

| Interacción | Dónde | Detalle | Desktop | Touch | Reduced motion |
|---|---|---|---|---|---|
| Intro de carga | Primera visita | Monograma "AV" que se dibuja (SVG stroke) + fade; máx. 1.2 s; no se repite en la sesión | ✓ | ✓ | se omite |
| Reveal de texto | Nombre hero, H2 | Máscara + translateY por palabra/letra, stagger | ✓ | ✓ | fade simple |
| Rol rotativo | Hero | Typewriter o text scramble | ✓ | ✓ | texto fijo |
| Reveal de sección | Todas | fade + `y: 24px` + stagger de hijos, una sola vez (`whileInView`, `once: true`, `amount: 0.2`) | ✓ | ✓ | sin movimiento |
| Botón magnético | CTAs | Sigue al cursor ±8 px con spring | ✓ | ✗ | ✗ |
| Spotlight | Tarjetas | Gradiente radial en `--x/--y` | ✓ | ✗ | ✓ (estático) |
| Tilt 3D | Proyectos, foto | máx. 6°, spring | ✓ | ✗ | ✗ |
| Borde gradiente animado | Destacados, "Más solicitado" | `conic-gradient` rotando | ✓ | ✓ | estático |
| Contadores | Sobre mí | 0 → valor en 1.5 s | ✓ | ✓ | valor final |
| Layout animation | Filtros stack/proyectos | reordenar con `layout` | ✓ | ✓ | instantáneo |
| Marquee | Stack | loop infinito CSS | ✓ | ✓ | estático |
| Acordeón | Precios | altura auto animada | ✓ | ✓ | instantáneo |
| Scroll progress | Navbar | `scaleX` ligado a scroll | ✓ | ✓ | ✓ |
| Theme toggle | Navbar | View Transition circular | ✓ | ✓ | cambio directo |
| Cursor personalizado (opcional) | Global | punto + anillo que crece sobre links | ✓ | ✗ | ✗ |

Reglas:
- Animar **solo** `transform` y `opacity` (y `filter` con moderación). Nunca `width/height/top/left`.
- Los efectos de hover van dentro de `@media (hover: hover) and (pointer: fine)`.
- `hover:scale` **solo** en elementos interactivos, y con escalas ≤ 1.03.
- Hook global `useReducedMotion()` de Motion; `MotionConfig reducedMotion="user"` en la raíz.
- Lenis desactivado en dispositivos táctiles y con reduced motion; los enlaces de ancla deben funcionar con Lenis (`lenis.scrollTo`) y compensar la altura del navbar.

---

## 8. Responsive — reglas por dispositivo

Breakpoints (mobile-first): `sm 640`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1536`, y un `3xl 1920` para ultrawide.

| Aspecto | Móvil 360–639 | Tablet 640–1023 | Laptop 1024–1439 | Desktop ≥ 1440 |
|---|---|---|---|---|
| Navbar | hamburguesa + menú fullscreen | hamburguesa | enlaces completos | enlaces completos |
| Hero | 1 col, foto arriba, texto centrado | 2 col compactas | 2 col | 2 col, display máx. 7rem |
| Stack grid | 2–3 col | 4 col | 5 col | 6 col |
| Bento especialidades | 1 col | 2 col | 4 col | 4 col, celdas más altas |
| Proyectos | 1 col, destacados apilados | 2 col | 3 col, destacados horizontales | 3 col, contenedor 1440 |
| Precios | 1 col, precio bajo título | 2 col | 3 col | 3 col |
| Certificados | 1–2 col, texto visible | 2 col | 3 col | 4 col |
| Fondo | ≤ 40 nodos, sin dot-grid | ≤ 70 nodos | completo | completo |
| Efectos hover/tilt/magnético | off | off (touch) | on | on |

Además:
- Áreas táctiles **≥ 44×44 px**.
- Respetar `env(safe-area-inset-*)` en navbar, menú móvil y footer.
- Sin scroll horizontal en ningún ancho entre 320 y 2560 px.
- En ≥ 1920 px el contenido no se estira: contenedor centrado y el fondo llena el resto.
- Probar orientación horizontal en móvil (hero no debe cortarse: usar `min-height` en lugar de `height`).

---

## 9. Datos a completar por Antony

```js
// src/data/profile.js
export const profile = {
  name: "Antony Valverde",
  role: ["Ingeniero en Sistemas", "Desarrollador Web", "Desarrollador Móvil", "Diseñador de Bases de Datos"],
  shortBio: "⟪COMPLETAR: 2–3 líneas. La actual está cortada: 'Ingeniero en sistemas con experiencia en desarrollo de aplicaciones web y móviles...'⟫",
  longBio: "⟪COMPLETAR: 1–2 párrafos para 'Sobre mí'⟫",
  yearsOfExperience: "⟪COMPLETAR⟫",
  available: true,                         // badge "Disponible para proyectos"
  location: "Costa Rica",
  university: "Universidad Nacional de Costa Rica",
  email: "antonyvalverde2003@gmail.com",
  phone: "85755357",                       // mostrar como +506 8575 5357
  whatsapp: true,                          // ⟪CONFIRMAR⟫ genera enlace wa.me
  cvUrl: null,                             // ⟪OPCIONAL: "/cv-antony-valverde.pdf"⟫
  githubUser: "AntonyValverde",
  socials: {
    github: "https://github.com/AntonyValverde",
    linkedin: "https://www.linkedin.com/in/antony-valverde-26a709274/",
    instagram: "https://www.instagram.com/arvr_2003",
    facebook: "https://www.facebook.com/antony.valverderojas",
  },
  featuredRepos: ["⟪COMPLETAR: nombres exactos de 1–3 repos a destacar⟫"],
  extraTools: ["⟪OPCIONAL: Git, Linux, Figma, Docker, React, Flutter...⟫"],
  contactFormEndpoint: null,               // ⟪OPCIONAL: URL de Formspree⟫
  siteUrl: "⟪COMPLETAR: dominio donde se publica, para meta OG⟫",
};
```

Fechas de certificados: `⟪COMPLETAR mes/año de cada uno⟫`.

Todo el resto del contenido (habilidades, servicios, precios, lenguajes, bases de datos) se toma **tal cual** de los componentes actuales y se mueve a `src/data/*.js`.

---

## 10. Plan de ejecución por fases

1. **Fase 0 — Migración:** crear proyecto Vite + React + Tailwind v4 en el mismo repo, mover `public/`, eliminar CRA, AOS, `App.css`, `logo.svg`, `curses.js`, `titulos.js`, `App.test.js`/`setupTests.js` de CRA (o migrarlos a Vitest). Verificar que `npm run dev` y `npm run build` funcionan.
2. **Fase 1 — Fundaciones:** tokens (`@theme`), fuentes, tema claro/oscuro con toggle, `src/data/*`, componentes UI base: `Container`, `Section`, `SectionHeading`, `Button` (primario/secundario/ghost, magnético opcional), `Card` (con spotlight), `Badge`, `Chip`, `IconLink`, `Dialog` accesible, `Skeleton`, `Toast`.
3. **Fase 2 — Layout:** `Navbar` (desktop + menú móvil), scroll progress, scroll-spy, Lenis, `Footer`, skip link.
4. **Fase 3 — Fondo interactivo** (sección 4) con todas las condiciones de rendimiento.
5. **Fase 4 — Secciones** en el orden de la sección 5.
6. **Fase 5 — Motion pass:** catálogo de la sección 7, revisión de reduced motion.
7. **Fase 6 — SEO y assets:** `lang="es"`, `<title>Antony Valverde — Ingeniero en Sistemas</title>`, meta description real, Open Graph + Twitter card (imagen OG 1200×630 generada con la marca), `theme-color` por tema, favicon/monograma SVG, `manifest.json` con nombre real, JSON-LD `Person`, `robots.txt`/`sitemap.xml`. Optimizar `perfil.jpg` y certificados (WebP/AVIF, tamaños responsive).
8. **Fase 7 — QA** con la checklist de la sección 12.

Estructura de carpetas esperada:

```
src/
  main.jsx  App.jsx  index.css
  data/        profile.js stack.js skills.js services.js certificates.js
  hooks/       useGithubRepos.js useScrollSpy.js useMediaQuery.js useTheme.js useLenis.js
  lib/         format.js (fechas relativas, nombres de repos) languageColors.js
  components/
    ui/        Button Card Badge Chip Dialog Skeleton Toast Container SectionHeading IconLink
    layout/    Navbar MobileMenu Footer ScrollProgress SkipLink
    background/InteractiveBackground.jsx
    sections/  Hero About Stack Specialties Projects Services Certificates Contact
```

---

## 11. Rendimiento y accesibilidad (requisitos no negociables)

- **Lighthouse (móvil):** Performance ≥ 90, Accessibility 100, Best Practices ≥ 95, SEO 100.
- **Core Web Vitals:** LCP < 2.5 s, CLS < 0.1, INP < 200 ms.
- JS inicial < 200 KB gzip; secciones bajo el pliegue y el lightbox con `React.lazy`.
- La imagen del hero con `fetchpriority="high"`; todas las demás `loading="lazy"` con dimensiones explícitas.
- HTML semántico: un solo `<h1>` (el nombre), `<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<footer>`.
- Navegación completa con teclado, `:focus-visible` con anillo del color de acento, orden de foco lógico.
- Todos los íconos-enlace con `aria-label`; imágenes con `alt` descriptivo.
- Contraste AA verificado en ambos temas.
- Todos los enlaces externos con `target="_blank" rel="noopener noreferrer"`.

---

## 12. Checklist de aceptación

- [ ] Se ve y funciona correctamente en 360, 390, 768, 1024, 1280, 1440 y 1920 px, y en móvil horizontal.
- [ ] Sin scroll horizontal en ningún ancho.
- [ ] Modo claro y oscuro completos, sin paneles con color fijo; la preferencia persiste.
- [ ] El fondo interactivo reacciona a mouse, click y touch; se pausa en pestaña oculta; es estático con reduced motion; ≥ 55 fps en laptop.
- [ ] Navbar con scroll-spy, progreso, menú móvil accesible (Esc, foco, bloqueo de scroll).
- [ ] Proyectos: sin forks ni repo de perfil, con descripción/estrellas/fecha, filtros, skeletons, caché y reintento.
- [ ] Lightbox de certificados accesible, con teclado y swipe.
- [ ] Correo y teléfono clicables; botón copiar funciona.
- [ ] Todo el contenido original está presente (10 habilidades, 6 servicios con precios exactos, las 12 tecnologías de `LanguagesGrid`, 5 BD, 4 certificados, 4 redes).
- [ ] Sin código muerto, sin AOS, sin warnings en consola ni en `npm run build`.
- [ ] Lighthouse móvil cumple los mínimos de la sección 11.
- [ ] Todos los `⟪COMPLETAR⟫` resueltos o convertidos en `TODO:` visibles.

Al terminar, entrega: resumen de cambios, capturas en 390 px, 768 px y 1440 px (tema oscuro y claro), resultados de Lighthouse y la lista de `TODO:` pendientes.
