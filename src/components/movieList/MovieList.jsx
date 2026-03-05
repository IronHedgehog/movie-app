import MovieCard from "../movieCard/MovieCard";
import MovieSkeleton from "./MovieSkeleton";

const SKELETON_COUNT = 10;

const MovieList = ({ movies, loading }) => {
  return (
    // Змінено ul на div для правильної семантики
    <div
      className="
        grid gap-4
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        lg:grid-cols-5
        xl:grid-cols-6
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
