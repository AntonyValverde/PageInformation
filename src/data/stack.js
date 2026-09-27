import { FaJava, FaCss3Alt } from "react-icons/fa6";
import {
  SiPython, SiJavascript, SiTypescript, SiPhp, SiDart, SiC, SiCplusplus,
  SiHtml5, SiBootstrap, SiReact,
  SiFirebase, SiMongodb, SiMariadb, SiMysql,
  SiGit, SiGithub, SiLinux, SiVercel,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { GrOracle } from "react-icons/gr";

export const stackCategories = [
  { id: "all", label: "Todos" },
  { id: "languages", label: "Lenguajes" },
  { id: "frontend", label: "Frontend" },
  { id: "databases", label: "Bases de datos" },
  { id: "tools", label: "Herramientas" },
];

// `color` es el color de marca que aparece en hover.
export const stack = [
  { name: "Java", Icon: FaJava, category: "languages", color: "#f89820" },
  { name: "Python", Icon: SiPython, category: "languages", color: "#3776ab" },
  { name: "JavaScript", Icon: SiJavascript, category: "languages", color: "#f7df1e" },
  { name: "TypeScript", Icon: SiTypescript, category: "languages", color: "#3178c6" },
  { name: "PHP", Icon: SiPhp, category: "languages", color: "#777bb4" },
  { name: "Dart", Icon: SiDart, category: "languages", color: "#0175c2" },
  { name: "C", Icon: SiC, category: "languages", color: "#a8b9cc" },
  { name: "C++", Icon: SiCplusplus, category: "languages", color: "#00599c" },
  { name: "C#", Icon: TbBrandCSharp, category: "languages", color: "#9b4f96" },

  { name: "React", Icon: SiReact, category: "frontend", color: "#61dafb" },
  { name: "HTML", Icon: SiHtml5, category: "frontend", color: "#e34f26" },
  { name: "CSS", Icon: FaCss3Alt, category: "frontend", color: "#1572b6" },
  { name: "Bootstrap", Icon: SiBootstrap, category: "frontend", color: "#7952b3" },

  { name: "Firebase", Icon: SiFirebase, category: "databases", color: "#ffca28" },
  { name: "MongoDB", Icon: SiMongodb, category: "databases", color: "#47a248" },
  { name: "MariaDB", Icon: SiMariadb, category: "databases", color: "#c0765a" },
  { name: "Oracle", Icon: GrOracle, category: "databases", color: "#f80000" },
  { name: "MySQL", Icon: SiMysql, category: "databases", color: "#4479a1" },

  { name: "Git", Icon: SiGit, category: "tools", color: "#f05032" },
  { name: "GitHub", Icon: SiGithub, category: "tools", color: "#a0a7b4" },
  { name: "Linux", Icon: SiLinux, category: "tools", color: "#fcc624" },
  { name: "Vercel", Icon: SiVercel, category: "tools", color: "#a0a7b4" },
];
