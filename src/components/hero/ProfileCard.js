export default function ProfileCard({ imgSrc, children }) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center md:flex-row md:items-start transition-transform hover:scale-[1.01]">
      <div className="w-full md:w-1/3 flex justify-center mb-4 md:mb-0">
        <img src={imgSrc} alt="Perfil" className="rounded-full w-40 h-40 border-4 border-indigo-500 shadow-lg" />
      </div>
      <div className="w-full md:w-2/3 mt-4 md:mt-0 md:ml-8 text-center md:text-left">
        {children}
      </div>
    </div>
  );
}
