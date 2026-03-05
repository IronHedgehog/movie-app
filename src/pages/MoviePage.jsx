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
    <div className="min-h-screen bg-[#141414] text-white">
      <div className="p-6 lg:p-12 max-w-[1600px] mx-auto">
        <section className="mb-20">
          <MovieInfo movie={movie} />
        </section>

        <section className="bg-gradient-to-r from-zinc-900 to-black p-8 rounded-3xl border border-red-900/20 shadow-2xl mb-20">
          <div className="max-w-4xl">
            <MovieAiVerdict movie={movie} />
          </div>
        </section>

        <section>
          <UserReviews movieId={movieId} />
        </section>
      </div>
    </div>
  );
};

export default MoviePage;
