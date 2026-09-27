// Ajustes locales para los repos de GitHub.
// - `featuredRepos`: aparecen arriba como proyectos destacados (en este orden).
// - `projectOverrides`: título y descripción curados; tienen prioridad sobre GitHub.
//   Los repos sin ajuste usan la descripción de GitHub.
export const featuredRepos = ["RapidJobsWeb", "hotel", "Investigaciones"];

export const hiddenRepos = ["AntonyValverde"];

// Capturas en /public/images/projects (generadas con `npm run capture:projects`).
export { default as projectPreviews } from "./projectPreviews.json";

export const projectOverrides = {
  RapidJobsWeb: {
    title: "RapidJobs",
    description: "Sitio de RapidJobs, una app para encontrar trabajos rápidos en Costa Rica, con guía paso a paso para descargar e instalar el APK.",
  },
  hotel: {
    title: "Hotel Paradise",
    description: "Sitio web para un hotel: habitaciones, piscina, restaurante y servicios, con diseño visual basado en tarjetas.",
  },
  Investigaciones: {
    description: "Síntesis y artículos de investigación en un solo lugar, con visor y descarga de cada documento.",
  },
  "Mi-Colecci-n": {
    title: "Mi Colección",
    description: "Galería de una colección de autos Hot Wheels, con carrusel destacado, galería completa y tabla de datos.",
  },
  "Algoritmos-de-ordenamiento": { title: "Algoritmos de ordenamiento" },
  Laberinto: { description: "Juego de laberinto en el navegador hecho con React." },
  Buscaminas: { description: "El clásico Buscaminas en el navegador, hecho con React." },
  Tragamonedas: { description: "Juego de tragamonedas en el navegador hecho con React." },
  Serpiente: { description: "El clásico juego de la serpiente, con puntaje, hecho con React." },
  Flowers: { description: "Animación de flores que crecen, hecha con React y CSS." },
  "Memory-cards": { title: "Memory Cards", description: "Juego de memoria con cartas hecho con React." },
  PageInformation: { title: "Este portafolio", description: "El sitio que estás viendo: React, Tailwind CSS, Motion y un fondo interactivo en canvas." },
};
