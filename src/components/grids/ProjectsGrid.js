import Loading from "../Loading";
import Profile from "../profile";

export default function ProjectsGrid({ repos }) {
  if (!repos?.length) return <Loading />;
  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {repos.map((r) => <Profile key={r.id} {...r} />)}
    </div>
  );
}
