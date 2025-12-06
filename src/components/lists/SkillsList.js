import { FaCheckCircle } from "react-icons/fa";

export default function SkillsList() {
  const skills = [
    "Manejo de ficheros",
    "Manejo de bases de datos",
    "Creación de juegos",
    "Servidores locales",
    "Programación web",
    "Desarrollo de software",
    "Redes de computadoras",
    "Seguridad informática",
    "Inteligencia artificial básica",
    "Desarrollo de aplicaciones móviles",
  ];

  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div
          key={skill}
          className="
            flex items-center gap-3 
            p-3 rounded-xl 
            bg-gray-50 dark:bg-gray-800/50 
            border border-gray-200 dark:border-gray-700
            transition-all duration-300
            hover:scale-[1.01]
            hover:shadow-md
            animate-fade-in
          "
        >
          <FaCheckCircle
            className="text-indigo-600 dark:text-indigo-400"
            size={20}
          />
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
            {skill}
          </p>
        </div>
      ))}
    </div>
  );
}
