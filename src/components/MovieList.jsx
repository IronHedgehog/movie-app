import MovieCard from "./MovieCard";

const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ul>
  );
};

export default MovieList;
