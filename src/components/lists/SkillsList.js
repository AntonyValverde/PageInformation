export default function SkillsList() {
  const skills = [
    "Manejo de ficheros","Manejo de bases de datos","Creación de juegos","Servidores locales",
    "Programación web","Desarrollo de software","Redes de computadoras","Seguridad informática",
    "Inteligencia artificial básica","Desarrollo de aplicaciones móviles",
  ];
  return (
    <ul className="list-disc pl-6 text-lg">
      {skills.map((s) => <li key={s}>{s}</li>)}
    </ul>
  );
}
