import Loading from "../Loading";
import Profile from "../profile";

export default function ProjectsGrid({ repos, loading, error }) {
  
  if (loading) return <Loading />;

  if (error)
    return (
      <p className="text-center text-red-400">
        Error al cargar los proyectos: {error}
      </p>
    );

  if (!repos?.length)
    return (
      <p className="text-center text-gray-400">
        No se encontraron proyectos.
      </p>
    );

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {repos.map((r, index) => (
        <div
          key={r.id}
          data-aos="fade-up"
          data-aos-delay={index * 80}
        >
          <Profile {...r} />
        </div>
      ))}
    </div>
  );
}
