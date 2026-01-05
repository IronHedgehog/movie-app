import { Link } from "react-router-dom";
import styles from "../styles/MovieCard.module.scss";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  return (
    <div className={styles.card}>
      <Link to={`/movies/${movie.id}`}>
        <img src={IMAGE_BASE + movie.poster_path} alt={movie.title} />
        <h3>{movie.title}</h3>
        <p>Rating: {movie.vote_average}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
