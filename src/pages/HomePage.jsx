import Button from "@mui/material/Button";
import { useState } from "react";

// Імпортуємо обидва хуки
import {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
} from "../store/services/moviesApi";

import MovieList from "../components/movieList/MovieList";
import MovieSkeletonList from "../components/movieList/MovieSkeletonList";
import SearchBar from "../components/SearchBar/SearchBar";
import ErrorMessage from "../components/UI/ErrorMessage";
import Loader from "../components/UI/Loader";

import PageContainer from "../components/layout/PageContainer";
import ThemeToggle from "../components/UI/ThemeToggle";

import Header from "../sections/Header/components/Header";
import Hero from "../sections/Hero/Hero";

const HomePage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  // Прапорець: чи ми зараз щось шукаємо?
  const isSearch = Boolean(query);

  // 1. Запит популярних фільмів (Пропускаємо, якщо є пошуковий запит)
  const {
    data: popularData,
    isFetching: isFetchingPopular,
    isError: isErrorPopular,
    refetch: refetchPopular,
  } = useGetPopularMoviesQuery(page, { skip: isSearch });

  // 2. Запит пошуку (Пропускаємо, якщо поле пошуку порожнє)
  const {
    data: searchData,
    isFetching: isFetchingSearch,
    isError: isErrorSearch,
    refetch: refetchSearch,
  } = useSearchMoviesQuery({ query, page }, { skip: !isSearch });

  // 3. Динамічно визначаємо, які дані зараз показувати
  const currentData = isSearch ? searchData : popularData;
  const isFetching = isSearch ? isFetchingSearch : isFetchingPopular;
  const isError = isSearch ? isErrorSearch : isErrorPopular;
  const refetch = isSearch ? refetchSearch : refetchPopular;

  const movies = currentData?.results || [];
  const totalPages = currentData?.total_pages || 0;

  // Додаємо безпечні перевірки
  const hasMore = page < totalPages;
  const isFirstPage = page === 1;

  // Обробник пошуку
  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1); // Новий пошук завжди починається з 1 сторінки
  };

  const loadMore = () => {
    if (!isFetching && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <main>
      <Header />
      <Hero />

      <PageContainer>
        <div className="flex justify-end py-4">
          <ThemeToggle />
        </div>
        <SearchBar onSearch={handleSearch} debounceTime={500} />

        {isError && (
          <ErrorMessage message="Failed to fetch movies" onRetry={refetch} />
        )}

        {isFetching && isFirstPage ? (
          <MovieSkeletonList />
        ) : (
          <MovieList movies={movies} loading={isFetching} />
        )}

        {isFetching && !isFirstPage && <Loader />}

        {!isFetching && hasMore && !isError && (
          <Button variant="outlined" onClick={loadMore}>
            Load more
          </Button>
        )}
      </PageContainer>
    </main>
  );
};

export default HomePage;
