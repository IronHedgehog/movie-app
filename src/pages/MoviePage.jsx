import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetMovieDetailsQuery } from "../store/services/moviesApi";
import { resetChat } from "../store/slices/aiSlice";

import MovieAiVerdict from "../components/AI/MovieAiVerdict";
import ErrorMessage from "../components/UI/ErrorMessage";
import Loader from "../components/UI/Loader";
import { IMAGE_BASE_URL } from "../utils/constants";

const MoviePage = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const {
    data: movie,
    isLoading,
    isError,
    refetch,
  } = useGetMovieDetailsQuery(movieId);

  // Очищення чату при виході зі сторінки
  useEffect(() => {
    return () => dispatch(resetChat());
  }, [dispatch]);

  if (isLoading) return <Loader />;
  if (isError)
    return <ErrorMessage message="Error loading details" onRetry={refetch} />;
  if (!movie) return null;

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-[300px] rounded-2xl shadow-xl object-cover"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-black mb-4">{movie.title}</h1>
          <p className="text-zinc-400 text-lg leading-relaxed mb-6">
            {movie.overview}
          </p>
          <div className="flex gap-4 text-sm font-bold uppercase tracking-widest text-accent">
            <span>{movie.release_date}</span>
            <span>Rating: {movie.vote_average.toFixed(1)}</span>
          </div>
          <MovieAiVerdict movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
