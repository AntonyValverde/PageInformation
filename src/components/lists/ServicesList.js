export default function ServicesList() {
  const services = [
    "Desarrollo de aplicaciones web","Desarrollo de aplicaciones móviles","Soporte técnico",
    "Sistemas contables","Base de datos","Programación de páginas informativas",
  ];
  return (
    <ul className="list-disc pl-6 text-lg">
      {services.map((s) => <li key={s}>{s}</li>)}
    </ul>
  );
}
