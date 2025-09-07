export default function Section({ title, children, className = "" }) {
  return (
    <section className={`bg-white rounded-lg shadow-xl p-6 mb-4 ${className}`}>
      {title && <h2 className="text-3xl font-extrabold text-indigo-600 mb-4 text-center">{title}</h2>}
      {children}
    </section>
  );
}
