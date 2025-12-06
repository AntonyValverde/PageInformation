// courses.js
// Lista de cursos y certificaciones adicionales

const courses = [
  {
    title: "Curso de React Avanzado",
    pdfLink: "/docs/courses/react_avanzado.pdf",
    category: "Desarrollo Web",
    level: "Avanzado",
  },
  {
    title: "Introducción a Python",
    pdfLink: "/docs/courses/intro_python.pdf",
    category: "Programación",
    level: "Básico",
  },
  // Agrega más cursos aquí
];

// Exportar como lista ordenada por título (mejor UX)
export default courses.sort((a, b) => a.title.localeCompare(b.title));
