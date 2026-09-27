import { FaLaptopCode, FaMobileScreen, FaHeadset, FaCalculator, FaDatabase, FaGlobe } from "react-icons/fa6";

export const services = [
  {
    title: "Desarrollo de aplicaciones web",
    Icon: FaLaptopCode,
    price: "$1500",
    summary: "Incluye diseño, desarrollo y pruebas exhaustivas.",
    breakdown: [
      { label: "Diseño", value: "$500" },
      { label: "Desarrollo", value: "$500" },
      { label: "Pruebas exhaustivas", value: "$500" },
    ],
    featured: true,
  },
  {
    title: "Desarrollo de aplicaciones móviles",
    Icon: FaMobileScreen,
    price: "$2000",
    summary: "Incluye diseño, desarrollo y pruebas en múltiples dispositivos.",
    breakdown: [
      { label: "Diseño", value: "$700" },
      { label: "Desarrollo", value: "$700" },
      { label: "Pruebas en múltiples dispositivos", value: "$600" },
    ],
  },
  {
    title: "Soporte técnico",
    Icon: FaHeadset,
    price: "$20",
    priceSuffix: "/hora",
    summary: "Incluye resolución de problemas y mantenimiento.",
    breakdown: [
      { label: "Ejemplo: 2 horas", value: "$40" },
      { label: "Cambios de componentes", value: "$50" },
    ],
  },
  {
    title: "Sistemas contables",
    Icon: FaCalculator,
    price: "$2500",
    summary: "Sistemas a medida para la gestión contable de tu negocio.",
    breakdown: [
      { label: "Análisis", value: "$700" },
      { label: "Desarrollo", value: "$1200" },
      { label: "Soporte", value: "$600" },
    ],
  },
  {
    title: "Base de datos",
    Icon: FaDatabase,
    price: "$1000",
    summary: "Diseño y optimización de bases de datos.",
    breakdown: [
      { label: "Diseño", value: "$400" },
      { label: "Optimización", value: "$600" },
    ],
  },
  {
    title: "Páginas informativas",
    Icon: FaGlobe,
    price: "$800",
    summary: "Sitios informativos con diseño, desarrollo y SEO.",
    breakdown: [
      { label: "Diseño", value: "$300" },
      { label: "Desarrollo", value: "$400" },
      { label: "SEO", value: "$100" },
    ],
  },
];

export const comboDiscount = "Descuentos de hasta el 30% en servicios combinados.";
