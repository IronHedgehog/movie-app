import { useParams } from "react-router-dom";
import { getMovieDetails } from "../api/moviesApi";
import { useMovieDetails } from "../hooks/useMovieDetails";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetails = () => {
  const { movieId } = useParams();
  const { movie, loading, error } = useMovieDetails(getMovieDetails, movieId);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  return (
    <div>
      <h1>{movie.title}</h1>

      {movie.poster_path && (
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          style={{ width: "300px", borderRadius: "8px" }}
        />
      )}

      <p>{movie.overview}</p>
      <p>
        <strong>Release date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average}
      </p>
    </div>
  );
};

export default MovieDetails;
