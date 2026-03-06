import { useState } from "react";
import {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
} from "../store/services/moviesApi";

const INITIAL_FILTERS = { genre: "", yearFrom: "", yearTo: "", rating: 0 };

export const useHomeMovies = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const isSearch = Boolean(query);

  const {
    data: popularData,
    isFetching: isFetchingPopular,
    isError: isErrorPopular,
    refetch: refetchPopular,
  } = useGetPopularMoviesQuery({ page, ...filters }, { skip: isSearch });

  const {
    data: searchData,
    isFetching: isFetchingSearch,
    isError: isErrorSearch,
    refetch: refetchSearch,
  } = useSearchMoviesQuery({ query, page }, { skip: !isSearch });

  const currentData = isSearch ? searchData : popularData;
  const isFetching = isSearch ? isFetchingSearch : isFetchingPopular;
  const isError = isSearch ? isErrorSearch : isErrorPopular;
  const refetch = isSearch ? refetchSearch : refetchPopular;

  const movies = currentData?.results || [];
  const totalPages = currentData?.total_pages || 0;
  const hasMore = page < totalPages;

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setFilters(INITIAL_FILTERS); // Скидаємо фільтри при текстовому пошуку
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const loadMore = () => setPage((p) => p + 1);

  return {
    movies,
    isFetching,
    isError,
    refetch,
    isFirstPage: page === 1,
    hasMore,
    isSearch,
    filters,
    isSidebarOpen,
    setIsSidebarOpen,
    handleSearch,
    handleFilterChange,
    loadMore,
  };
};
