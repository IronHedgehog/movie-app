import { Link } from "react-router-dom";
import { Film } from "lucide-react";
import FavoriteButton from "../UI/FavoriteButton";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, vote_average, release_date } = movie;

  return (
    <Link
      to={`/movies/${id}`}
      className="
        group
        flex flex-col
        rounded-2xl /* ✨ Трохи м'якші кути для преміального вигляду */
        overflow-hidden
        bg-zinc-900 dark:bg-zinc-100
        shadow-sm dark:shadow-none
        transition-all duration-300 hover:shadow-xl hover:shadow-black/50 /* ✨ Тінь при наведенні */
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-indigo-500
        focus-visible:ring-offset-2
        focus-visible:ring-offset-zinc-950
        relative
        h-full
      "
      aria-label={`Open details for ${title}`}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-zinc-800 dark:bg-zinc-200">
        <FavoriteButton movieId={id} />

        {poster_path ? (
          <img
            src={`${IMAGE_BASE_URL}${poster_path}`}
            alt={`Poster of ${title}`}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-110 /* ✨ Більш плавний і глибокий зум */
            "
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center opacity-80 transition-transform duration-500 group-hover:scale-110">
            <Film
              size={56} /* ✨ Збільшив іконку */
              strokeWidth={1}
              className="text-zinc-600 dark:text-zinc-400 mb-4"
            />
            <span className="text-xs font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-widest text-balance">
              Постер у розшуку
            </span>
          </div>
        )}
      </div>

      {/* Info Container */}
      <div className="mt-auto p-4 sm:p-5 flex flex-col gap-2">
        {" "}
        {/* ✨ Більше падінгів і flex-gap */}
        <h3 className="line-clamp-2 text-base font-bold text-white dark:text-zinc-900 leading-snug">
          {title}
        </h3>
        <div className="mt-1 flex items-center justify-between text-sm text-zinc-400 dark:text-zinc-500 font-medium">
          <span>{release_date?.slice(0, 4)}</span>
          <span
            aria-label={`Rating ${vote_average}`}
            className="flex items-center gap-1 text-yellow-400"
          >
            <span className="text-xs">⭐</span> {vote_average?.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
