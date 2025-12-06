import {
  FaJava, FaPython, FaHtml5, FaCss3Alt,
  FaPhp, FaBootstrap, FaJs
} from 'react-icons/fa';

import {
  SiTypescript, SiDart, SiC, SiCplusplus, SiCsharp
} from 'react-icons/si';

const items = [
  { Icon: FaJava, label: "Java", color: "text-red-600" },
  { Icon: FaPython, label: "Python", color: "text-yellow-400" },
  { Icon: FaJs, label: "JavaScript", color: "text-yellow-500" },
  { Icon: SiTypescript, label: "TypeScript", color: "text-blue-600" },
  { Icon: FaPhp, label: "PHP", color: "text-indigo-600" },
  { Icon: FaHtml5, label: "HTML", color: "text-orange-600" },
  { Icon: FaCss3Alt, label: "CSS", color: "text-blue-500" },
  { Icon: FaBootstrap, label: "Bootstrap", color: "text-purple-600" },
  { Icon: SiDart, label: "Dart", color: "text-sky-500" },
  { Icon: SiC, label: "C", color: "text-blue-700" },
  { Icon: SiCplusplus, label: "C++", color: "text-blue-600" },
  { Icon: SiCsharp, label: "C#", color: "text-green-600" },
];

export default function LanguagesGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {items.map(({ Icon, label, color }) => (
        <div
          key={label}
          className="
            bg-white dark:bg-gray-800 
            border border-gray-200 dark:border-gray-700
            rounded-2xl 
            p-6 
            flex flex-col items-center
            shadow-md dark:shadow-none
            transition-all duration-300 
            hover:scale-[1.03]
            hover:shadow-xl
            animate-fade-in
          "
        >
          <Icon className={`text-5xl mb-3 ${color}`} />
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
