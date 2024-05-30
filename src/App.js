import React, { useState, useEffect } from "react";
import './App.css';
import PageHead from './components/PageHead';
import Loading from "./components/Loading";
import Profile from './components/profile';
import 'tailwindcss/tailwind.css';
import { FaJava, FaPython, FaHtml5, FaCss3Alt, FaPhp, FaBootstrap, FaJs, FaReact } from 'react-icons/fa';
import { SiTypescript, SiDart } from 'react-icons/si';

function App() {
  const perfil = './perfil.jpg';
  const [personalRepos, setPersonalRepos] = useState([]);
  const [collaborations, setCollaborations] = useState([]);
  const [user] = useState("AntonyValverde");

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
        <section className="mt-8">
          <h2 className="text-3xl font-extrabold text-indigo-600 mb-4 text-center">Proyectos con Colaboraciones</h2>
          <article>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {!collaborations.length ? (
                <Loading />
              ) : (
                collaborations.map((item) => (
                  <Profile key={item.id} {...item} />
                ))
              )}
            </div>
          </article>
        </section>
      </main>
      <footer className="bg-gradient-to-r from-purple-600 to-red-600 text-white p-6 text-center mt-auto">
        <h4 className="text-lg">Contactenos: 85755357</h4>
        <p className="text-lg">antonyvalverde2003@gmail.com</p>
        <p className="text-lg">Universidad Nacional De Costa Rica</p>
        <h6 className="text-sm">Copyright ® 2023</h6>
      </footer>
    </div>
  );
}

export default App;
