// src/components/hero/ProfileCard.js
import React from "react";

export default function ProfileCard({ imgSrc, children }) {
  return (
    <div
      className="
        bg-gray-800/50
        border border-gray-700
        rounded-2xl 
        p-8 
        flex flex-col md:flex-row gap-8
        shadow-md dark:shadow-none
        transition-all duration-500
        hover:scale-[1.01]
        animate-fade-in
      "
      data-aos="zoom-in-up"
    >
      {/* Imagen del usuario */}
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src={imgSrc}
          alt="Perfil"
          className="
            rounded-full 
            w-40 h-40 
            border-4 border-indigo-500 
            shadow-xl
          "
        />
      </div>

      {/* Información del usuario */}
      <div className="w-full md:w-2/3 text-center md:text-left">
        {children}
      </div>
    </div>
  );
}
