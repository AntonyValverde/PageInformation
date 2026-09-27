import { useEffect } from "react";
import { About } from "./About";
import { Contact } from "./Contact";
import { Education } from "./Education";
import { Projects } from "./Projects";
import { Services } from "./Services";
import { Specialties } from "./Specialties";
import { Stack } from "./Stack";

// Secciones bajo el hero: se cargan en un chunk aparte para acelerar el primer pintado.
export default function BelowFold({ github }) {
  // Si se entró con un ancla (#proyectos), saltamos ahí cuando la sección ya existe.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id && id !== "inicio") document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <About repos={github.repos} loading={github.loading} />
      <Stack />
      <Specialties />
      <Projects {...github} />
      <Services />
      <Education />
      <Contact />
    </>
  );
}
