import { useHomeMovies } from "../hooks/useHomeMovies";

import SearchBar from "../components/SearchBar/SearchBar";
import ErrorMessage from "../components/UI/ErrorMessage";
import ThemeToggle from "../components/UI/ThemeToggle";
import PageContainer from "../components/layout/PageContainer";
import Header from "../sections/Header/components/Header";
import Hero from "../sections/Hero/Hero";

import FilterSidebar from "../components/UI/FilterSidebar";
import PaginatedMovieGrid from "../components/movieList/PaginatedMovieGrid";

const HomePage = () => {
  // ✨ Уся магія тепер ховається тут
  const {
    movies,
    isFetching,
    isError,
    refetch,
    isFirstPage,
    hasMore,
    isSearch,
    filters,
    isSidebarOpen,
    setIsSidebarOpen,
    handleSearch,
    handleFilterChange,
    loadMore,
  } = useHomeMovies();

  return (
    <main className="flex flex-col min-h-screen relative">
      <Header />
      <Hero />

      <PageContainer>
        <div className="flex justify-end py-4">
          <ThemeToggle />
        </div>

        <SearchBar onSearch={handleSearch} debounceTime={500} />

        {isError && (
          <ErrorMessage
            message="Помилка завантаження фільмів"
            onRetry={refetch}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {!isSearch && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-full bg-zinc-800 text-white p-3 rounded-xl font-bold border border-zinc-700 transition-colors"
            >
              Налаштувати фільтри 🎬
            </button>
          )}

          {/* Десктопний сайдбар */}
          {!isSearch && (
            <div className="hidden lg:block sticky top-24 h-fit z-30">
              <FilterSidebar
                isOpen={false}
                onClose={() => setIsSidebarOpen(false)}
                activeFilters={filters}
                onFilterChange={handleFilterChange} // ✨ Передали новий пропс
              />
            </div>
          )}

          {/* Мобільний сайдбар */}
          <div className="lg:hidden">
            <FilterSidebar
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
              activeFilters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="flex-1">
            <PaginatedMovieGrid
              movies={movies}
              isFetching={isFetching}
              isFirstPage={isFirstPage}
              isError={isError}
              hasMore={hasMore}
              loadMore={loadMore}
            />
          </div>
        </div>
      </PageContainer>
    </main>
  );
};

export default HomePage;
