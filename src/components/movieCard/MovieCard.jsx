import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, vote_average, release_date } = movie;

  return (
    <Link
      to={`/movies/${id}`}
      className="
        group
        block
        rounded-xl
        overflow-hidden
        bg-zinc-900  dark:bg-white
       shadow-sm dark:shadow-none
        transition
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-indigo-500
        focus-visible:ring-offset-2
        focus-visible:ring-offset-zinc-950
      "
      aria-label={`Open details for ${title}`}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
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
              duration-300
              group-hover:scale-105
            "
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-zinc-800 text-sm text-zinc-400">
            No image
          </div>
        )}
      </div>

      <div className="mt-auto p-3">
        <h3 className="line-clamp-2 text-sm font-semibold  text-white dark:text-zinc-900">
          {title}
        </h3>

        <div className="mt-2 flex items-center justify-between text-xs text-zinc-400 ">
          <span>{release_date?.slice(0, 4)}</span>
          <span
            aria-label={`Rating ${vote_average}`}
            className="font-medium text-yellow-400"
          >
            ⭐ {vote_average?.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
