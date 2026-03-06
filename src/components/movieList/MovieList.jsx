import MovieCard from "../movieCard/MovieCard";
import MovieSkeleton from "./MovieSkeleton";

const SKELETON_COUNT = 10;

const MovieList = ({ movies, loading }) => {
  return (
    <div
      className="
        grid 
        gap-6 sm:gap-8
        grid-cols-2
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-3
        xl:grid-cols-4
        2xl:grid-cols-5
      "
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}

      {loading &&
        Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <MovieSkeleton key={`skeleton-${index}`} />
        ))}
    </div>
  );
};

export default MovieList;
