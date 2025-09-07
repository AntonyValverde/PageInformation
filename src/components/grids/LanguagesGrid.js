import { FaJava, FaPython, FaHtml5, FaCss3Alt, FaPhp, FaBootstrap, FaJs } from 'react-icons/fa';
import { SiTypescript, SiDart, SiC, SiCplusplus, SiCsharp } from 'react-icons/si';

const items = [
  { Icon: FaJava, label: "Java", color: "text-red-600" },          // rojo
  { Icon: FaPython, label: "Python", color: "text-yellow-400" },   // amarillo
  { Icon: FaJs, label: "JavaScript", color: "text-yellow-500" },   // amarillo
  { Icon: SiTypescript, label: "TypeScript", color: "text-blue-600" }, // azul
  { Icon: FaPhp, label: "PHP", color: "text-indigo-600" },         // índigo
  { Icon: FaHtml5, label: "HTML", color: "text-orange-600" },      // naranja
  { Icon: FaCss3Alt, label: "CSS", color: "text-blue-500" },       // azul claro
  { Icon: FaBootstrap, label: "Bootstrap", color: "text-purple-600" }, // púrpura
  { Icon: SiDart, label: "Dart", color: "text-sky-500" },          // azul cielo
  { Icon: SiC, label: "C", color: "text-blue-700" },               // azul fuerte
  { Icon: SiCplusplus, label: "C++", color: "text-blue-600" },     // azul
  { Icon: SiCsharp, label: "C#", color: "text-green-600" },        // verde
];

export default function LanguagesGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map(({ Icon, label, color }) => (
        <div key={label} className="flex flex-col items-center">
          <Icon className={`text-5xl ${color}`} />
          <p className="text-lg mt-2">{label}</p>
        </div>
      ))}
    </div>
  );
}
