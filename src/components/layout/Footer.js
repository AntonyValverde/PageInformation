import {
  FaPhoneAlt,
  FaEnvelope,
  FaUniversity,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="
    bg-gray-800/50
    border-t border-gray-700
    text-gray-300
    py-10 mt-16 
    transition-colors duration-500
  "
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-around items-center mb-6">
          
          {/* Columna Izquierda */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <h4 className="text-xl font-semibold mb-2">Contáctenos</h4>

            <p className="text-lg mt-1 flex items-center justify-center md:justify-start">
              <FaPhoneAlt className="mr-2 text-indigo-500 dark:text-indigo-400" /> 
              85755357
            </p>

            <p className="text-lg mt-1 flex items-center justify-center md:justify-start">
              <FaEnvelope className="mr-2 text-indigo-500 dark:text-indigo-400" /> 
              antonyvalverde2003@gmail.com
            </p>

            <p className="text-lg mt-1 flex items-center justify-center md:justify-start">
              <FaUniversity className="mr-2 text-indigo-500 dark:text-indigo-400" /> 
              Universidad Nacional De Costa Rica
            </p>
          </div>

          {/* Columna Derecha */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-semibold mb-2">Síguenos</h4>

            <div className="flex justify-center md:justify-start space-x-5 mt-2">
              {[ 
                { Icon: FaGithub, link: "https://github.com/AntonyValverde" },
                { Icon: FaLinkedin, link: "https://www.linkedin.com/in/antony-valverde-26a709274/" },
                { Icon: FaInstagram, link: "https://www.instagram.com/arvr_2003?igsh=MWMyenR3eTI3NGZocA==" },
                { Icon: FaFacebook, link: "https://www.facebook.com/antony.valverderojas" }
              ].map(({ Icon, link }, i) => (
                <a
                  key={i}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    transition-all duration-300 
                    hover:text-indigo-500 dark:hover:text-indigo-400
                    hover:scale-110
                  "
                >
                  <Icon size={28} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700 pt-4 text-center">
          <h6 className="text-sm">
            &copy; {new Date().getFullYear()} Antony Valverde. Todos los derechos reservados.
          </h6>
        </div>
      </div>
    </footer>
  );
}
