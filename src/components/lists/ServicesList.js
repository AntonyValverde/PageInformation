import { FaCheckCircle } from "react-icons/fa";

export default function ServicesList() {
  const services = [
    "Desarrollo de aplicaciones web",
    "Desarrollo de aplicaciones móviles",
    "Soporte técnico",
    "Sistemas contables",
    "Base de datos",
    "Programación de páginas informativas",
  ];

  return (
    <div className="space-y-4">
      {services.map((service) => (
        <div
          key={service}
          className="
            flex items-start gap-3 
            p-3 rounded-xl 
            bg-gray-50 dark:bg-gray-800/50 
            border border-gray-200 dark:border-gray-700
            transition-all duration-300
            hover:scale-[1.01]
            hover:shadow-md
            animate-fade-in
          "
        >
          <FaCheckCircle className="text-indigo-600 dark:text-indigo-400 mt-1" size={20} />
          <p className="text-lg text-gray-800 dark:text-gray-200 font-medium">
            {service}
          </p>
        </div>
      ))}
    </div>
  );
}
