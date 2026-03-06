// src/components/movieList/PaginatedMovieGrid.jsx
import InfiniteScroll from "react-infinite-scroll-component";
import MovieList from "./MovieList";
import MovieSkeletonList from "./MovieSkeletonList";
import Loader from "../UI/Loader";

const PaginatedMovieGrid = ({
  movies,
  isFetching,
  isFirstPage,
  isError,
  hasMore,
  loadMore,
}) => {
  if (isFetching && isFirstPage) {
    return <MovieSkeletonList />;
  }

  return (
    <InfiniteScroll
      dataLength={movies.length}
      next={loadMore}
      hasMore={hasMore && !isError}
      loader={
        <div className="flex justify-center my-10">
          <Loader />
        </div>
      }
      endMessage={
        !isFetching &&
        movies.length > 0 && (
          <p className="text-center text-zinc-500 my-8 font-medium">
            Бро, ти передивився всі фільми! 🍿
          </p>
        )
      }
      style={{ overflow: "visible" }}
    >
      <MovieList movies={movies} loading={false} />
    </InfiniteScroll>
  );
};

export default PaginatedMovieGrid;
