import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-10 animate-fade-in">
      
      {/* SPINNER */}
      <div
        className="
          w-12 h-12 
          border-4 border-gray-300 dark:border-gray-700 
          border-t-indigo-600 dark:border-t-indigo-400
          rounded-full animate-spin
        "
      ></div>

      {/* TEXTO */}
      <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg font-medium">
        Cargando...
      </p>
    </div>
  );
}
