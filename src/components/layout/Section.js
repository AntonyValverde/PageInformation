export default function Section({ title, children, className = "" }) {
  return (
    <section
      className={`
        bg-gray-800/50
        border border-gray-700
        rounded-2xl
        p-8 my-8
        shadow-md dark:shadow-none
        ${className}
      `}
      data-aos="fade-up"
    >
      {title && (
        <h2 className="text-3xl font-bold text-center text-indigo-400 mb-6">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
