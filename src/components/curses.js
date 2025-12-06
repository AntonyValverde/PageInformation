import React from "react";
import courses from "./titulos";
import { FaFilePdf } from "react-icons/fa";

function CourseItem({ title, pdfLink }) {
  return (
    <div
      className="
        bg-white dark:bg-gray-800 
        border border-gray-200 dark:border-gray-700
        rounded-2xl p-6
        shadow-md dark:shadow-none
        transition-all duration-300
        hover:scale-[1.02]
        hover:shadow-lg
        animate-fade-in
        mb-6
      "
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
        {title}
      </h2>

      <a
        href={pdfLink}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-flex items-center gap-2
          text-indigo-600 dark:text-indigo-400
          font-medium
          hover:underline
          transition-colors
        "
      >
        <FaFilePdf size={20} />
        Ver PDF
      </a>
    </div>
  );
}

export default function OtherSkills() {
  return (
    <section className="container mx-auto p-4 animate-fade-in">
      <h2
        className="
          text-3xl font-bold 
          text-indigo-600 dark:text-indigo-400 
          mb-8 text-center
        "
      >
        Otros Conocimientos
      </h2>

      <div className="space-y-6">
        {courses.map((course, index) => (
          <CourseItem key={index} title={course.title} pdfLink={course.pdfLink} />
        ))}
      </div>
    </section>
  );
}
