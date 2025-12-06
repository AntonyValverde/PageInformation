// src/components/PageHead.js
import React from "react";

export default function PageHead() {
  return (
    <header
  className="py-10 text-center bg-gray-800/50"
  data-aos="fade-down"
>

      <h1
        className="text-5xl font-extrabold tracking-tight text-indigo-400 animate-fade-in"
      >
        Información Personal
      </h1>

      <p
        className="mt-2 text-gray-400 animate-fade-in-delay"
      >
        Portafolio profesional
      </p>
    </header>
  );
}
