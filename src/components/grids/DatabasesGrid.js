import { SiFirebase, SiMongodb, SiMariadb, SiOracle, SiMysql } from 'react-icons/si';

const items = [
  { Icon: SiFirebase, label: "Firebase", color: "text-yellow-500" },
  { Icon: SiMongodb, label: "MongoDB", color: "text-green-600" },
  { Icon: SiMariadb, label: "MariaDB", color: "text-blue-600" },
  { Icon: SiOracle, label: "Oracle", color: "text-red-600" },
  { Icon: SiMysql, label: "MySQL", color: "text-sky-500" },
];

export default function DatabasesGrid() {
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
