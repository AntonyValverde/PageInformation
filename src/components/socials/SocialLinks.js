export default function SocialLinks() {
  const links = [
    { href: 'https://www.linkedin.com/in/antony-valverde-26a709274/', label: 'LinkedIn', classes: 'from-green-400 to-blue-500' },
    { href: 'https://www.facebook.com/antony.valverderojas', label: 'Facebook', classes: 'from-blue-600 to-blue-400' },
    { href: 'https://www.instagram.com/arvr_2003?igsh=MWMyenR3eTI3NGZocA==', label: 'Instagram', classes: 'from-pink-500 to-yellow-500' },
    { href: 'https://github.com/AntonyValverde', label: 'GitHub', classes: 'from-gray-700 to-black' },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {links.map(({ href, label, classes }) => (
        <a key={label} href={href} className={`bg-gradient-to-r ${classes} text-white py-2 px-4 rounded-full transition`}>
          {label}
        </a>
      ))}
    </div>
  );
}
