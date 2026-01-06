import { useCallback, useEffect, useRef, useState } from "react";

import { getPopularMovies, searchMovies } from "../api/moviesApi";

import MovieList from "../components/movieList/MovieList";
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

  const { movies, loading, error, hasMore, loadMore, reset } =
    usePaginatedMovies(fetchFn, query);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    reset();
  }, [query]);

  return (
    <div>
      <SearchBar onSearch={setQuery} debounceTime={500} />

      {error && <ErrorMessage message={error} onRetry={reset} />}

      <MovieList movies={movies} />

      {loading && <Loader />}

      {!loading && hasMore && <button onClick={loadMore}>Load more</button>}
    </div>
  );
};

export default Home;
