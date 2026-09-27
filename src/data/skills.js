import {
  FaCode, FaMobileScreen, FaDatabase, FaFolderOpen, FaGamepad, FaServer,
  FaLaptopCode, FaNetworkWired, FaShieldHalved, FaBrain,
} from "react-icons/fa6";

// `size`: "lg" ocupa una celda grande en el bento (desktop/tablet).
export const skills = [
  { title: "Programación web", Icon: FaCode, size: "lg", text: "Sitios y aplicaciones web modernas, responsivas y rápidas, del diseño a la publicación." },
  { title: "Desarrollo de aplicaciones móviles", Icon: FaMobileScreen, size: "lg", text: "Apps pensadas para el teléfono, con interfaces claras y buen rendimiento." },
  { title: "Manejo de bases de datos", Icon: FaDatabase, size: "lg", text: "Modelado, consultas y optimización en motores relacionales y NoSQL." },
  { title: "Desarrollo de software", Icon: FaLaptopCode, text: "Análisis, diseño y construcción de soluciones a medida." },
  { title: "Manejo de ficheros", Icon: FaFolderOpen, text: "Lectura, escritura y procesamiento de archivos y datos." },
  { title: "Creación de juegos", Icon: FaGamepad, text: "Juegos interactivos en el navegador con lógica y animación." },
  { title: "Servidores locales", Icon: FaServer, text: "Configuración de entornos y servicios para desarrollo y pruebas." },
  { title: "Redes de computadoras", Icon: FaNetworkWired, text: "Fundamentos de redes, protocolos y conectividad." },
  { title: "Seguridad informática", Icon: FaShieldHalved, text: "Buenas prácticas para proteger sistemas y datos." },
  { title: "Inteligencia artificial básica", Icon: FaBrain, text: "Conceptos y aplicaciones iniciales de IA." },
];
