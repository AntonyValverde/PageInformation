// src/hooks/useGithubRepos.js
import { useEffect, useState } from "react";

export function useGithubRepos(username = "AntonyValverde") {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchRepos() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          {
            signal,
            headers: {
              "Accept": "application/vnd.github+json",
              "User-Agent": "Mi-Portafolio-Web",
            },
          }
        );

        // Manejo de error HTTP
        if (!res.ok) {
          throw new Error(`GitHub API error: ${res.status}`);
        }

        const data = await res.json();

        // Validación profesional
        if (!Array.isArray(data)) {
          throw new Error("Respuesta inesperada de GitHub");
        }

        // Ordenar los repos por última actualización
        const sorted = data.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );

        setRepos(sorted);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("useGithubRepos ERROR:", err);
          setError(err.message);
          setRepos([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();

    return () => controller.abort(); // Limpieza automática
  }, [username]);

  return { repos, loading, error };
}
