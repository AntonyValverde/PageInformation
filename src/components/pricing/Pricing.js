import { useState } from "react";

export default function Pricing() {
  const [showMore, setShowMore] = useState(false);
  return (
    <div>
      <ul className="list-disc pl-6 text-lg">
        <li>
          Desarrollo de aplicaciones web:
          <ul className="list-disc pl-6 text-lg">
            <li>$1500 - incluye diseño, desarrollo y pruebas exhaustivas</li>
            <li>- Diseño: $500</li>
            <li>- Desarrollo: $500</li>
            <li>- Pruebas exhaustivas: $500</li>
          </ul>
        </li>
        <li>
          Desarrollo de aplicaciones móviles:
          <ul className="list-disc pl-6 text-lg">
            <li>$2000 - incluye diseño, desarrollo y pruebas en múltiples dispositivos</li>
            <li>- Diseño: $700</li>
            <li>- Desarrollo: $700</li>
            <li>- Pruebas en múltiples dispositivos: $600</li>
          </ul>
        </li>

        {showMore && (
          <>
            <li>
              Soporte técnico: $20 por hora - incluye resolución de problemas y mantenimiento
              <ul className="list-disc pl-6 text-lg">
                <li>Costo por hora: $20</li>
                <li>Ejemplo: 2 horas = $40</li>
                <li>Cambios de componentes: $50</li>
              </ul>
            </li>
            <li>
              Sistemas contables: $2500 - análisis, desarrollo y soporte post-implementación
              <ul className="list-disc pl-6 text-lg">
                <li>Análisis: $700</li>
                <li>Desarrollo: $1200</li>
                <li>Soporte: $600</li>
              </ul>
            </li>
            <li>
              Base de datos: $1000 - diseño y optimización
              <ul className="list-disc pl-6 text-lg">
                <li>Diseño: $400</li>
                <li>Optimización: $600</li>
              </ul>
            </li>
            <li>
              Páginas informativas: $800 - diseño, desarrollo y SEO básico
              <ul className="list-disc pl-6 text-lg">
                <li>Diseño: $300</li>
                <li>Desarrollo: $400</li>
                <li>SEO: $100</li>
              </ul>
            </li>
            <div className="mt-4 text-center text-gray-700">
              <p>Incluimos rebajas de hasta el 30% en servicios combinados.</p>
            </div>
          </>
        )}
      </ul>

      <div className="mt-4 text-center text-gray-700">
        <button
          onClick={() => setShowMore((v) => !v)}
          className="bg-indigo-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition"
        >
          {showMore ? "Mostrar Menos" : "Mostrar Más"}
        </button>
      </div>
    </div>
  );
}
