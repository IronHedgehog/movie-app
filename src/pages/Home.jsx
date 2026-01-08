import Button from "@mui/material/Button";
import { useCallback, useEffect, useRef, useState } from "react";

import { getPopularMovies, searchMovies } from "../api/moviesApi";

import MovieList from "../components/movieList/MovieList";
import MovieSkeletonList from "../components/movieList/MovieSkeletonList";
import SearchBar from "../components/SearchBar/SearchBar";
import ErrorMessage from "../components/UI/ErrorMessage";
import Loader from "../components/UI/Loader";

import { usePaginatedMovies } from "../hooks";

const Home = () => {
  const [query, setQuery] = useState("");
  const isFirstRender = useRef(true);

  const fetchFn = useCallback(
    (q, page, signal) =>
      q ? searchMovies(q, page, signal) : getPopularMovies(page, signal),
    []
  );

  const { movies, loading, error, hasMore, loadMore, reset, isFirstPage } =
    usePaginatedMovies(fetchFn, query);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    reset();
  }, [query, reset]);

  return (
    <div>
      <div className="min-h-screen bg-bg text-white p-6">Tailwind works</div>
      <SearchBar onSearch={setQuery} debounceTime={500} />

      {error && <ErrorMessage message={error} onRetry={reset} />}

      {loading && isFirstPage ? (
        <MovieSkeletonList />
      ) : (
        <MovieList movies={movies} loading={loading} />
      )}

      {loading && !isFirstPage && <Loader />}

      {!loading && hasMore && !error && (
        <Button variant="outlined" onClick={loadMore}>
          Load more
        </Button>
      )}
    </div>
  );
};

export default Home;
