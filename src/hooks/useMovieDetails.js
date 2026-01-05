import { useEffect, useState } from "react";
import { useAbortableFetch } from "./useAbortableFetch";

export const useMovieDetails = (fetchFn, movieId) => {
  const { createSignal } = useAbortableFetch();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchFn(movieId, createSignal());
        setMovie(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Failed to load movie");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId, fetchFn]);

  return { movie, loading, error };
};
