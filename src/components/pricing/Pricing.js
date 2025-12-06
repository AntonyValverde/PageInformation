import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function Pricing() {
  const [showMore, setShowMore] = useState(false);

  const items = [
    {
      title: "Desarrollo de aplicaciones web",
      price: "$1500",
      details: [
        "Incluye diseño, desarrollo y pruebas exhaustivas",
        "Diseño: $500",
        "Desarrollo: $500",
        "Pruebas exhaustivas: $500",
      ],
    },
    {
      title: "Desarrollo de aplicaciones móviles",
      price: "$2000",
      details: [
        "Incluye diseño, desarrollo y pruebas en múltiples dispositivos",
        "Diseño: $700",
        "Desarrollo: $700",
        "Pruebas en múltiples dispositivos: $600",
      ],
    },
  ];

  const extraItems = [
    {
      title: "Soporte técnico",
      price: "$20/hora",
      details: [
        "Incluye resolución de problemas y mantenimiento",
        "Ejemplo: 2 horas = $40",
        "Cambios de componentes: $50",
      ],
    },
    {
      title: "Sistemas contables",
      price: "$2500",
      details: ["Análisis: $700", "Desarrollo: $1200", "Soporte: $600"],
    },
    {
      title: "Base de datos",
      price: "$1000",
      details: ["Diseño: $400", "Optimización: $600"],
    },
    {
      title: "Páginas informativas",
      price: "$800",
      details: ["Diseño: $300", "Desarrollo: $400", "SEO: $100"],
    },
  ];

  const allItems = showMore ? [...items, ...extraItems] : items;

  return (
    <div className="space-y-6 animate-fade-in">
      {allItems.map(({ title, price, details }) => (
        <div
          key={title}
          className="
            bg-gray-50 dark:bg-gray-800/50
            border border-gray-200 dark:border-gray-700
            rounded-2xl p-6
            shadow-md dark:shadow-none
            transition-all duration-300
            hover:scale-[1.01] hover:shadow-lg
          "
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {title}
            </h3>
            <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {price}
            </span>
          </div>

          <ul className="space-y-2">
            {details.map((d, i) => (
              <li key={i} className="flex items-start gap-2">
                <FaCheckCircle
                  size={18}
                  className="text-indigo-600 dark:text-indigo-400 mt-[2px]"
                />
                <span className="text-gray-700 dark:text-gray-300">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Botón Mostrar Más */}
      <div className="text-center">
        <button
          onClick={() => setShowMore((v) => !v)}
          className="
            mt-4 
            bg-indigo-600 dark:bg-indigo-500 
            text-white 
            py-2 px-6 rounded-xl
            shadow-md hover:shadow-lg
            hover:bg-indigo-700 dark:hover:bg-indigo-400
            transition-all duration-300
          "
        >
          {showMore ? "Mostrar Menos" : "Mostrar Más"}
        </button>

        {showMore && (
          <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
            Incluimos rebajas de hasta el 30% en servicios combinados.
          </p>
        )}
      </div>
    </div>
  );
}
