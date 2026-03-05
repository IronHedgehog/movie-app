import { IMAGE_BASE_URL } from "../../utils/constants";
import FavoriteButton from "../UI/FavoriteButton";

const MovieInfo = ({ movie }) => {
  const matchScore = Math.floor(movie.vote_average * 10);

  return (
    <div className="relative flex flex-col md:flex-row gap-8 items-start md:items-center py-10">
      <div className="relative group w-full md:w-[320px] shrink-0 self-center md:self-start">
        <div className="absolute -inset-1 bg-red-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative">
          <img
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-xl shadow-2xl object-cover border border-zinc-800"
          />
          <FavoriteButton movieId={movie.id} />
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-none">
          {movie.title.toUpperCase()}
        </h1>

        <div className="flex items-center gap-4 text-sm font-bold">
          <span className="text-green-500">{matchScore}% Match</span>
          <span className="text-zinc-400 border border-zinc-700 px-2 py-0.5 rounded">
            {movie.release_date?.slice(0, 4)}
          </span>
          <span className="text-zinc-400">16+</span>
          <span className="text-zinc-400 font-medium">HD</span>
        </div>

        <p className="text-zinc-300 text-lg md:text-xl leading-relaxed max-w-3xl font-light">
          {movie.overview}
        </p>

        <div className="flex gap-2 text-sm text-zinc-500 italic">
          {movie.genres?.map((g) => (
            <span key={g.id}>• {g.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
