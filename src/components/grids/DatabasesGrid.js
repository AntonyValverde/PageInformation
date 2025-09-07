import { SiFirebase, SiMongodb, SiMariadb, SiOracle, SiMysql } from 'react-icons/si';

const items = [
  { Icon: SiFirebase, label: "Firebase", color: "text-yellow-500" },  // amarillo
  { Icon: SiMongodb, label: "MongoDB", color: "text-green-600" },     // verde
  { Icon: SiMariadb, label: "MariaDB", color: "text-blue-600" },      // azul
  { Icon: SiOracle, label: "Oracle", color: "text-red-600" },         // rojo
  { Icon: SiMysql, label: "MySQL", color: "text-sky-500" },           // azul cielo
];

export default function DatabasesGrid() {
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
