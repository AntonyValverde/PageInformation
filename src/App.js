import React, { useState, useEffect } from "react";
import './App.css';
import PageHead from './components/PageHead';
import Loading from "./components/Loading";
import Profile from './components/profile';
import OtherSkills from "./components/curses";
import 'tailwindcss/tailwind.css';
import { FaJava, FaPython, FaHtml5, FaCss3Alt, FaPhp, FaBootstrap, FaJs, FaReact, FaDatabase } from 'react-icons/fa';
import { FaPhoneAlt, FaEnvelope, FaUniversity, FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';
import {  SiC, SiCplusplus, SiCsharp } from 'react-icons/si';
import { SiTypescript, SiDart, SiFirebase, SiMongodb, SiMariadb, SiOracle, SiMysql } from 'react-icons/si';

function App() {
  const perfil = './perfil.jpg';
  const [personalRepos, setPersonalRepos] = useState([]);
  const [collaborations, setCollaborations] = useState([]);
  const [user] = useState("AntonyValverde");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`);
        const data = await res.json();
        setPersonalRepos(data);
      } catch (error) {
        console.error("Error fetching personal repos:", error);
      }
    };

    const fetchCollaborations = async () => {
      try {
        const starredRes = await fetch(`https://api.github.com/users/${user}/starred?per_page=100`);
        const starredData = await starredRes.json();

        const forkedRes = await fetch(`https://api.github.com/users/${user}/repos?type=forks&per_page=100`);
        const forkedData = await forkedRes.json();

        const collaborationRepos = [...starredData, ...forkedData].filter(repo => repo.owner.login !== user);
        setCollaborations(collaborationRepos);
      } catch (error) {
        console.error("Error fetching collaborations:", error);
      }
    };

    fetchRepos();
    fetchCollaborations();
  }, [user]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage("");
  };

  return (
    <div className="bg-gradient-to-r from-blue-200 to-indigo-200 min-h-screen flex flex-col">
      <header className="shadow-lg">
        <PageHead />
      </header>
      <nav className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center md:flex-row md:items-start transition-transform transform hover:scale-105">
          <div className="w-full md:w-1/3 flex justify-center mb-4 md:mb-0">
            <img src={perfil} alt="Mi imagen" className="rounded-full w-40 h-40 border-4 border-indigo-500 shadow-lg transform transition-transform hover:scale-110" />
          </div>
          <div className="w-full md:w-2/3 mt-4 md:mt-0 md:ml-8 text-center md:text-left">
            <h2 className="text-2xl font-extrabold text-indigo-600 mb-2">Descripción de conocimientos:</h2>
            <p className="text-xl text-gray-700 mb-4">
              Ingeniero en sistemas con experiencia en desarrollo de aplicaciones web y móviles. Habilidades en React, Flutter, Firebase, PHP, MySQL, y más. Pasión por la tecnología y el aprendizaje continuo.
            </p>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        <section className="bg-white rounded-lg shadow-xl p-6 mb-4">
          <div className="flex flex-col items-center">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-indigo-600 mb-4">Redes Sociales</h2>
              <div className="flex flex-wrap justify-center space-x-4">
                <a href='https://www.linkedin.com/in/antony-valverde-26a709274/' className='bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-full hover:from-blue-500 hover:to-green-400 transition duration-300 mb-2'>LinkedIn</a>
                <a href='https://www.facebook.com/antony.valverderojas' className='bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 px-4 rounded-full hover:from-blue-400 hover:to-blue-600 transition duration-300 mb-2'>Facebook</a>
                <a href='https://www.instagram.com/arvr_2003?igsh=MWMyenR3eTI3NGZocA==' className='bg-gradient-to-r from-pink-500 to-yellow-500 text-white py-2 px-4 rounded-full hover:from-yellow-500 hover:to-pink-500 transition duration-300 mb-2'>Instagram</a>
                <a href='https://github.com/AntonyValverde' className='bg-gradient-to-r from-gray-700 to-black text-white py-2 px-4 rounded-full hover:from-black hover:to-gray-700 transition duration-300 mb-2'>GitHub</a>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white rounded-lg shadow-xl p-6 mb-4">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-indigo-600 mb-4">Lenguajes de Programación</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <FaJava className="text-5xl text-blue-600" />
                <p className="text-lg mt-2">Java</p>
              </div>
              <div className="flex flex-col items-center">
                <FaPython className="text-5xl text-blue-500" />
                <p className="text-lg mt-2">Python</p>
              </div>
              <div className="flex flex-col items-center">
                <FaJs className="text-5xl text-yellow-500" />
                <p className="text-lg mt-2">JavaScript</p>
              </div>
              <div className="flex flex-col items-center">
                <SiTypescript className="text-5xl text-blue-700" />
                <p className="text-lg mt-2">TypeScript</p>
              </div>
              <div className="flex flex-col items-center">
                <FaPhp className="text-5xl text-indigo-600" />
                <p className="text-lg mt-2">PHP</p>
              </div>
              <div className="flex flex-col items-center">
                <FaHtml5 className="text-5xl text-orange-600" />
                <p className="text-lg mt-2">HTML</p>
              </div>
              <div className="flex flex-col items-center">
                <FaCss3Alt className="text-5xl text-blue-700" />
                <p className="text-lg mt-2">CSS</p>
              </div>
              <div className="flex flex-col items-center">
                <FaBootstrap className="text-5xl text-purple-600" />
                <p className="text-lg mt-2">Bootstrap</p>
              </div>
              <div className="flex flex-col items-center">
                <SiDart className="text-5xl text-blue-600" />
                <p className="text-lg mt-2">Dart</p>
              </div>
              <div className="flex flex-col items-center">
                <SiC className="text-5xl text-blue-600" />
                <p className="text-lg mt-2">C</p>
              </div>
              <div className="flex flex-col items-center">
                <SiCplusplus className="text-5xl text-blue-600" />
                <p className="text-lg mt-2">C++</p>
              </div>
              <div className="flex flex-col items-center">
                <SiCsharp className="text-5xl text-blue-600" />
                <p className="text-lg mt-2">C#</p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white rounded-lg shadow-xl p-6 mb-4">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-indigo-600 mb-4">Gestores de Bases de Datos</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <SiFirebase className="text-5xl text-yellow-600" />
                <p className="text-lg mt-2">Firebase</p>
              </div>
              <div className="flex flex-col items-center">
                <SiMongodb className="text-5xl text-green-600" />
                <p className="text-lg mt-2">MongoDB</p>
              </div>
              <div className="flex flex-col items-center">
                <SiMariadb className="text-5xl text-blue-600" />
                <p className="text-lg mt-2">MariaDB</p>
              </div>
              <div className="flex flex-col items-center">
                <SiOracle className="text-5xl text-red-600" />
                <p className="text-lg mt-2">Oracle</p>
              </div>
              <div className="flex flex-col items-center">
                <SiMysql className="text-5xl text-blue-600" />
                <p className="text-lg mt-2">MySQL</p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h2 className="text-3xl font-extrabold text-indigo-600 mb-4 text-center">Mis Proyectos</h2>
          <article>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {!personalRepos.length ? (
                <Loading />
              ) : (
                personalRepos.map((item) => (
                  <Profile key={item.id} {...item} />
                ))
              )}
            </div>
          </article>
        </section>
        <h2 className="text-3xl font-extrabold text-indigo-600 mb-4 text-center mt-8">Otros Aprendizajes</h2>
        <section className="bg-white rounded-lg shadow-xl p-6 mb-4">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleImageClick('/titulos/LinuxUnhatched.jpeg')}>
                <p className="text-lg text-blue-600 underline">Linux Unhatched</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleImageClick('/titulos/LinuxEssentials.jpeg')}>
                <p className="text-lg text-blue-600 underline">Linux Essentials</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleImageClick('path/to/your/image3.jpg')}>
                <p className="text-lg text-blue-600 underline">Título 3</p>
              </div>
            </div>
            {/* Agrega más enlaces a imágenes según sea necesario */}
          </div>
        </section>
      </main>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" onClick={closeModal}>
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Aprendizaje" className="rounded-lg mt-4 w-full" />
          </div>
        </div>
      )}


      <footer className="bg-gradient-to-r from-purple-600 to-red-600 text-white p-8 text-center mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-around items-center mb-4">
            <div className="mb-4 md:mb-0">
              <h4 className="text-2xl font-bold">Contáctenos</h4>
              <p className="text-lg mt-2 flex items-center justify-center md:justify-start"><FaPhoneAlt className="mr-2" /> 85755357</p>
              <p className="text-lg mt-2 flex items-center justify-center md:justify-start"><FaEnvelope className="mr-2" /> antonyvalverde2003@gmail.com</p>
              <p className="text-lg mt-2 flex items-center justify-center md:justify-start"><FaUniversity className="mr-2" /> Universidad Nacional De Costa Rica</p>
            </div>
            <div className="mb-4 md:mb-0">
              <h4 className="text-2xl font-bold">Síguenos</h4>
              <div className="flex justify-center md:justify-start space-x-4 mt-2">
                <a href="https://github.com/AntonyValverde" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300"><FaGithub size={30} /></a>
                <a href="https://www.linkedin.com/in/antony-valverde-26a709274/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300"><FaLinkedin size={30} /></a>
                <a href="https://www.instagram.com/arvr_2003?igsh=MWMyenR3eTI3NGZocA==" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300"><FaInstagram size={30} /></a>
                <a href="https://www.facebook.com/antony.valverderojas" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300"><FaFacebook size={30} /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-400 pt-4">
            <h6 className="text-sm">&copy; 2023 Antony Valverde. Todos los derechos reservados.</h6>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
