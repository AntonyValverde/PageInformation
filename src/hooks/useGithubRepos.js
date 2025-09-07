// src/hooks/useGithubRepos.js
import { useEffect, useState } from "react";

export function useGithubRepos(user = "AntonyValverde") {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=updated`);
        const data = await res.json();
        setRepos(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("useGithubRepos error:", e);
        setRepos([]);
      }
    })();
  }, [user]);

  return repos;
}
