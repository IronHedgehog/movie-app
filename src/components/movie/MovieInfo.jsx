import { IMAGE_BASE_URL } from "../../utils/constants";
import FavoriteButton from "../UI/FavoriteButton";

const MovieInfo = ({ movie }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Блок з постером */}
      <div className="w-full md:w-[300px] shrink-0 relative">
        <img
          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
          alt={movie.title}
          className="w-full rounded-2xl shadow-xl object-cover"
        />
        {/* ✨ Наше сердечко тепер живе тут! */}
        <FavoriteButton movieId={movie.id} />
      </div>

      {/* Блок з інформацією */}
      <div className="flex-1">
        <h1 className="text-4xl font-black mb-4 text-white">{movie.title}</h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-6">
          {movie.overview}
        </p>
        <div className="flex gap-4 text-sm font-bold uppercase tracking-widest text-red-500">
          <span>{movie.release_date?.slice(0, 4)}</span>
          <span>Rating: ⭐ {movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
