import { useCallback, useEffect, useState } from "react";
import { featuredRepos, hiddenRepos, projectOverrides } from "../data/projects";
import { formatRepoName } from "../lib/format";

const CACHE_TTL = 30 * 60 * 1000;
const cacheKey = (user) => `gh-repos:${user}`;

function readCache(user) {
  try {
    const raw = sessionStorage.getItem(cacheKey(user));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(user, data) {
  try {
    sessionStorage.setItem(cacheKey(user), JSON.stringify({ time: Date.now(), data }));
  } catch {
    /* sin almacenamiento: seguimos sin caché */
  }
}

// Deja solo lo que la UI necesita y aplica los ajustes locales.
function normalize(repos) {
  const featuredIndex = (name) => {
    const i = featuredRepos.indexOf(name);
    return i === -1 ? Infinity : i;
  };

  return repos
    .filter((r) => !r.fork && !r.archived && !hiddenRepos.includes(r.name))
    .map((r) => {
      const override = projectOverrides[r.name] ?? {};
      return {
        id: r.id,
        name: r.name,
        title: override.title ?? formatRepoName(r.name),
        description: override.description || r.description || "Sin descripción.",
        url: r.html_url,
        homepage: r.homepage || null,
        language: r.language,
        topics: r.topics ?? [],
        stars: r.stargazers_count,
        updatedAt: r.pushed_at || r.updated_at,
        featured: featuredRepos.includes(r.name),
      };
    })
    .sort(
      (a, b) =>
        featuredIndex(a.name) - featuredIndex(b.name) ||
        b.stars - a.stars ||
        new Date(b.updatedAt) - new Date(a.updatedAt),
    );
}

export function useGithubRepos(user) {
  const [state, setState] = useState(() => {
    const cached = readCache(user);
    return cached
      ? { repos: cached.data, loading: false, error: null }
      : { repos: [], loading: true, error: null };
  });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const cached = readCache(user);
    if (cached && Date.now() - cached.time < CACHE_TTL && attempt === 0) return;

    const controller = new AbortController();
    setState((s) => ({ ...s, loading: s.repos.length === 0, error: null }));

    fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status === 403 ? "Se alcanzó el límite de consultas a GitHub." : `GitHub respondió ${res.status}.`);
        }
        return res.json();
      })
      .then((data) => {
        const repos = normalize(data);
        writeCache(user, repos);
        setState({ repos, loading: false, error: null });
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        // Con caché vencida seguimos mostrando lo último que tenemos.
        setState((s) => ({ repos: s.repos, loading: false, error: s.repos.length ? null : err.message }));
      });

    return () => controller.abort();
  }, [user, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, retry };
}
