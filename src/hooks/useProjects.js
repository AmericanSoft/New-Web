import { useEffect, useState } from "react";
import { listProjects } from "../lib/api/projects";

export function useProjects(params = {}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setFetchError("");
        const list = await listProjects(params);
        if (mounted) setProjects(list);
      } catch (e) {
        if (mounted) setFetchError(String(e.message || e));
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [JSON.stringify(params)]);

  return { projects, loading, fetchError };
}
