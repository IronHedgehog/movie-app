import { useParams } from "react-router-dom";

import { getMovieDetails } from "../api/moviesApi";

import ErrorMessage from "../components/UI/ErrorMessage";
import Loader from "../components/UI/Loader";

import { useMovieDetails } from "../hooks";

import { IMAGE_BASE_URL } from "../utils/constants";

const MoviePage = () => {
  const { movieId } = useParams();
  const { movie, loading, error, retry } = useMovieDetails(
    getMovieDetails,
    movieId
  );

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={retry} />;
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

export default MoviePage;
