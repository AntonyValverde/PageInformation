import { FaPhoneAlt, FaEnvelope, FaUniversity, FaGithub, FaLinkedin, FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
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
              <a href="https://github.com/AntonyValverde" target="_blank" rel="noreferrer" className="hover:text-gray-300"><FaGithub size={30} /></a>
              <a href="https://www.linkedin.com/in/antony-valverde-26a709274/" target="_blank" rel="noreferrer" className="hover:text-gray-300"><FaLinkedin size={30} /></a>
              <a href="https://www.instagram.com/arvr_2003?igsh=MWMyenR3eTI3NGZocA==" target="_blank" rel="noreferrer" className="hover:text-gray-300"><FaInstagram size={30} /></a>
              <a href="https://www.facebook.com/antony.valverderojas" target="_blank" rel="noreferrer" className="hover:text-gray-300"><FaFacebook size={30} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-400 pt-4">
          <h6 className="text-sm">&copy; 2023 Antony Valverde. Todos los derechos reservados.</h6>
        </div>
      </div>
    </footer>
  );
}
