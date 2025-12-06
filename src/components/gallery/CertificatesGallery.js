import { useState } from "react";
import Modal from "../layout/Modal";

const items = [
  { src: "/titulos/LinuxUnhatched.jpeg", label: "Linux Unhatched" },
  { src: "/titulos/LinuxEssentials.jpeg", label: "Linux Essentials" },
  { src: "/titulos/Academic Process Mining Fundamentals.jpeg", label: "Academic Process Mining Fundamentals" },
  { src: "/titulos/Celonis Foundations.jpeg", label: "Celonis Foundations" },
];

export default function CertificatesGallery() {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState("");

  const openImg = (src) => {
    setImg(src);
    setOpen(true);
  };

  return (
    <>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
        {items.map(({ src, label }) => (
          <div key={src} className="flex flex-col items-center">
            <button
              onClick={() => openImg(src)}
              className="
                bg-gray-100 dark:bg-gray-800
                border border-gray-300 dark:border-gray-700
                text-indigo-600 dark:text-indigo-400
                py-3 px-5 rounded-xl
                font-medium
                transition-all duration-300
                hover:scale-[1.03]
                hover:shadow-md
              "
              data-aos="zoom-in"
            >
              {label}
            </button>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <img
          src={img}
          alt="Certificado"
          className="rounded-xl mt-4 w-full shadow-lg"
        />
      </Modal>
    </>
  );
}
