import MovieCard from "../movieCard/MovieCard";
// import styles from "./MovieList.module.scss"

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
