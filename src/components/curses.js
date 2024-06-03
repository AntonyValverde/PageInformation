// OtherSkills.js
import React from "react";
import courses from "./titulos";

function CourseItem({ title, pdfLink }) {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 mb-4">
      <h2 className="text-3xl font-extrabold text-indigo-600 mb-4">{title}</h2>
      <a href={pdfLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ver PDF</a>
    </div>
  );
}

function OtherSkills() {
  return (
    <section className="container mx-auto p-4">
      <h2 className="text-3xl font-extrabold text-indigo-600 mb-4 text-center">Otros Conocimientos</h2>
      {courses.map((course, index) => (
        <CourseItem key={index} title={course.title} pdfLink={course.pdfLink} />
      ))}
    </section>
  );
}

export default OtherSkills;
