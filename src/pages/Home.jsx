import Button from "@mui/material/Button";
import { useCallback, useEffect, useRef, useState } from "react";

import { getPopularMovies, searchMovies } from "../api/moviesApi";

import MovieList from "../components/movieList/MovieList";
import MovieSkeletonList from "../components/movieList/MovieSkeletonList";
import SearchBar from "../components/SearchBar/SearchBar";
import ErrorMessage from "../components/UI/ErrorMessage";
import Loader from "../components/UI/Loader";

import PageContainer from "../components/layout/PageContainer";
import ThemeToggle from "../components/UI/ThemeToggle";
import { usePaginatedMovies } from "../hooks";
import Hero from "../sections/Hero/Hero";

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
    <main>
      <Hero />

      <PageContainer>
        <div className="flex justify-end py-4">
          <ThemeToggle />
        </div>
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
      </PageContainer>
    </main>
  );
};

export default Home;
