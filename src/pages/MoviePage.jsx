import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetMovieDetailsQuery } from "../store/services/moviesApi";
import { resetChat } from "../store/slices/aiSlice";

import MovieAiVerdict from "../components/AI/MovieAiVerdict";
import MovieInfo from "../components/movie/MovieInfo"; // Наш новий компонент
import UserReviews from "../components/movie/UserReviews"; // Наш новий компонент
import ErrorMessage from "../components/UI/ErrorMessage";
import Loader from "../components/UI/Loader";

const MoviePage = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();

  const {
    data: movie,
    isLoading,
    isError,
    refetch,
  } = useGetMovieDetailsQuery(movieId);

  useEffect(() => {
    return () => dispatch(resetChat());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (isError)
    return <ErrorMessage message="Error loading details" onRetry={refetch} />;
  if (!movie) return null;

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-12">
      {/* 1. Блок з інформацією та постером (з сердечком) */}
      <MovieInfo movie={movie} />

      {/* 2. Блок AI Вердикту (він тепер під постером/описом) */}
      <MovieAiVerdict movie={movie} />

      {/* 3. Блок з реальними відгуками користувачів */}
      <UserReviews movieId={movieId} />
    </div>
  );
};

export default MoviePage;
