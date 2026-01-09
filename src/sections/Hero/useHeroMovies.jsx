import { useEffect, useState } from "react";
import { getHeroMovies } from "../../api/moviesApi";
import { useAbortableFetch } from "../../hooks";

export const useHeroMovies = () => {
  const { createSignal } = useAbortableFetch();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHero = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getHeroMovies(createSignal());
        setMovies(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Failed to load featured movies");
        }
      } finally {
        setLoading(false);
      }
    };

    loadHero();
  }, []);

  return { movies, loading, error };
};
