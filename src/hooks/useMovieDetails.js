import { useEffect, useState, useCallback } from "react";
import { useAbortableFetch } from "./useAbortableFetch";

export const useMovieDetails = (fetchFn, movieId) => {
  const { createSignal } = useAbortableFetch();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovie = useCallback(async () => {
    if (!movieId) return;

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
  }, [movieId, fetchFn]);

  useEffect(() => {
    fetchMovie();
  }, [fetchMovie]);

  return {
    movie,
    loading,
    error,
    retry: fetchMovie,
  };
};
