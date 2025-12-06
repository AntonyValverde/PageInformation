import React, { useEffect } from "react";
import "./App.css";
import "tailwindcss/tailwind.css";
import PageHead from "./components/PageHead";
import Section from "./components/layout/Section";
import Footer from "./components/layout/Footer";
import ProfileCard from "./components/hero/ProfileCard";
import SkillsList from "./components/lists/SkillsList";
import ServicesList from "./components/lists/ServicesList";
import Pricing from "./components/pricing/Pricing";
import SocialLinks from "./components/socials/SocialLinks";
import LanguagesGrid from "./components/grids/LanguagesGrid";
import DatabasesGrid from "./components/grids/DatabasesGrid";
import ProjectsGrid from "./components/grids/ProjectsGrid";
import CertificatesGallery from "./components/gallery/CertificatesGallery";
import { useGithubRepos } from "./hooks/useGithubRepos.js";
import AOS from "aos";
import "aos/dist/aos.css";


export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,          // duración de la animación en ms
      easing: "ease-out-cubic",
      once: true,             // solo la primera vez que aparece
      offset: 60,             // se dispara un poco antes de entrar al viewport
    });
  }, []);
  const { repos, loading, error } = useGithubRepos("AntonyValverde");
  const perfil = "./perfil.jpg";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 flex flex-col">

      <header className="shadow-lg">
        <PageHead />
      </header>

      <nav className="container mx-auto p-4">
        <ProfileCard imgSrc={perfil}>
          <h2 className="text-2xl font-extrabold text-indigo-600 mb-2">Descripción de conocimientos:</h2>
          <p className="text-xl text-gray-700 mb-4">
            Ingeniero en sistemas con experiencia en desarrollo de aplicaciones web y móviles...
          </p>
        </ProfileCard>
      </nav>

      <main className="container mx-auto p-4">
        <Section title="Mis Conocimientos"><SkillsList /></Section>
        <Section title="Mis Servicios"><ServicesList /></Section>
        <Section title="Desglose de Precios"><Pricing /></Section>
        <Section title="Redes Sociales"><SocialLinks /></Section>
        <Section title="Lenguajes de Programación"><LanguagesGrid /></Section>
        <Section title="Gestores de Bases de Datos"><DatabasesGrid /></Section>
        <Section title="Mis Proyectos">
          <ProjectsGrid repos={repos} loading={loading} error={error} />
        </Section>

        <Section title="Otros Aprendizajes"><CertificatesGallery /></Section>
      </main>

      <Footer />
    </div>
  );
}
