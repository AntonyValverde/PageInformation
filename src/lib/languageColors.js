// Colores de lenguaje de GitHub Linguist
const colors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572a5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  PHP: "#4f5d95",
  Dart: "#00b4ab",
  HTML: "#e34c26",
  CSS: "#663399",
  Kotlin: "#a97bff",
  Swift: "#f05138",
};

export const languageColor = (lang) => colors[lang] ?? "#8b949e";
