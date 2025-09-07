import React from "react";
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


export default function App() {
  const perfil = "./perfil.jpg";
  const repos = useGithubRepos("AntonyValverde");

  return (
    <div className="bg-gradient-to-r from-blue-200 to-indigo-200 min-h-screen flex flex-col">
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
        <Section title="Mis Proyectos"><ProjectsGrid repos={repos} /></Section>
        <Section title="Otros Aprendizajes"><CertificatesGallery /></Section>
      </main>

      <Footer />
    </div>
  );
}
