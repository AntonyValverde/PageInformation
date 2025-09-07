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

  const openImg = (src) => { setImg(src); setOpen(true); };

  return (
    <>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {items.map(({ src, label }) => (
          <div key={src} className="flex flex-col items-center">
            <button
              className="bg-blue-100 p-4 rounded-lg shadow-md hover:shadow-lg transition"
              onClick={() => openImg(src)}
            >
              <p className="text-lg text-blue-600 underline">{label}</p>
            </button>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <img src={img} alt="Certificado" className="rounded-lg mt-4 w-full" />
      </Modal>
    </>
  );
}
