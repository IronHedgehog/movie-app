import { useCallback, useEffect, useRef, useState } from "react";
import MovieList from "../components/MovieList";
import SearchBar from "../components/SearchBar";
import { getPopularMovies, searchMovies } from "../api/moviesApi";
import { usePaginatedMovies } from "../hooks/usePaginatedMovies";

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

      {error && <p>{error}</p>}

      <MovieList movies={movies} />

      {loading && <p>Loading...</p>}

      {!loading && hasMore && <button onClick={loadMore}>Load more</button>}
    </div>
  );
};

export default Home;
