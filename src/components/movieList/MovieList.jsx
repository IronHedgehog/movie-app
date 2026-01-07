import MovieCard from "../movieCard/MovieCard";
import MovieSkeleton from "./MovieSkeleton";

const SKELETON_COUNT = 10;

const MovieList = ({ movies, loading }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 200px)",
        gap: "16px",
      }}
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
