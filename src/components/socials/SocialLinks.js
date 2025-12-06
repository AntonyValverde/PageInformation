import { FaLinkedin, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

export default function SocialLinks() {
  const links = [
    { href: "https://www.linkedin.com/in/antony-valverde-26a709274/", label: "LinkedIn", Icon: FaLinkedin },
    { href: "https://www.facebook.com/antony.valverderojas", label: "Facebook", Icon: FaFacebook },
    { href: "https://www.instagram.com/arvr_2003?igsh=MWMyenR3eTI3NGZocA==", label: "Instagram", Icon: FaInstagram },
    { href: "https://github.com/AntonyValverde", label: "GitHub", Icon: FaGithub },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="
            flex items-center gap-2
            bg-gray-100 dark:bg-gray-800
            text-gray-800 dark:text-gray-200
            px-5 py-3 rounded-xl 
            border border-gray-200 dark:border-gray-700
            shadow-sm dark:shadow-none
            transition-all duration-300
            hover:scale-[1.05]
            hover:shadow-md
          "
        >
          <Icon className="text-indigo-600 dark:text-indigo-400" size={20} />
          <span className="text-lg font-medium">{label}</span>
        </a>
      ))}
    </div>
  );
}
