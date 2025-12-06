// src/components/layout/Modal.js
export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0
        bg-black/60 backdrop-blur-sm
        flex justify-center items-center
        z-50
        animate-fadeIn
        cursor-pointer
      "
      onClick={onClose} // Cierra tocando cualquier parte del fondo
    >
      <div
        className="
          bg-white dark:bg-gray-800
          text-gray-900 dark:text-gray-100
          p-6 rounded-2xl shadow-2xl 
          max-w-3xl w-[90%]
          border border-gray-200 dark:border-gray-700
          animate-zoomIn3D
          cursor-default
        "
        onClick={(e) => e.stopPropagation()} // Evita cierre al tocar el contenido
      >
        {children}
      </div>
    </div>
  );
}
