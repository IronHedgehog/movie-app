import { useCallback, useEffect, useState } from "react";
import { useAbortableFetch } from "./useAbortableFetch";
import { useMoviesCache } from "./useMoviesCache";

export const usePaginatedMovies = (fetchFn, query = "") => {
  const { createSignal } = useAbortableFetch();
  const cache = useMoviesCache();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const key = `${fetchFn.name}-${query}-${page}`;
    const cached = cache.get(key);
    if (cached) {
      setMovies((prev) => [...prev, ...cached]);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchFn(query, page, createSignal());
        cache.set(key, data.results);

        setMovies((prev) => {
          const existingIds = new Set(prev.map((m) => m.id));
          const uniqueNewMovies = data.results.filter(
            (m) => !existingIds.has(m.id)
          );
          return [...prev, ...uniqueNewMovies];
        });

        setHasMore(data.results.length > 0);
      } catch (err) {
        if (err.name !== "AbortError") setError("Failed to load movies");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [fetchFn, query, page]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((p) => p + 1);
    }
  }, [loading, hasMore]);

  const reset = useCallback(() => {
    cache.clear();
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, []);

  return {
    movies,
    loading,
    error,
    hasMore,
    loadMore,
    reset,
    isFirstPage: page === 1,
  };
};
