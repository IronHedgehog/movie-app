import { Link } from "react-router-dom";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function HeroSlide({ movie, isPriority = false }) {
  const year = movie.release_date?.slice(0, 4);
  const rating =
    typeof movie.vote_average === "number"
      ? movie.vote_average.toFixed(1)
      : null;

  const imageSrc = `${IMAGE_BASE_URL}${movie.backdrop_path}`;

  return (
    <div className="relative h-full">
      {/* Background image — LCP friendly */}
      <img
        src={imageSrc}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover scale-110 pointer-events-none"
        loading={isPriority ? "eager" : "lazy"}
        fetchpriority={isPriority ? "high" : "auto"}
      />

      {/* Overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black via-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-6 md:px-16">
        <div className="max-w-xl space-y-4">
          <div data-swiper-parallax="-300">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white line-clamp-2">
              {movie.title}
            </h1>

            <p className="text-gray-200 text-sm md:text-base line-clamp-3 mt-4">
              {movie.overview}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-300 mt-4">
              {rating && (
                <span className="text-green-400 font-semibold">★ {rating}</span>
              )}
              {year && <span>{year}</span>}
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <Link
              to={`/movies/${movie.id}`}
              className="inline-flex min-h-[44px] items-center justify-center
                         bg-white text-black px-6 py-2 rounded-md font-semibold
                         hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-white"
            >
              ▶ Play
            </Link>

            <Link
              to={`/movies/${movie.id}`}
              className="inline-flex min-h-[44px] items-center justify-center
                         bg-white/20 text-white px-6 py-2 rounded-md
                         hover:bg-white/30 focus-visible:ring-2 focus-visible:ring-white"
            >
              More info
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
