const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

export default function HeroSlide({ movie }) {
  const year = movie.release_date?.slice(0, 4);

  return (
    <div className="relative h-full">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: `url(${IMAGE_BASE_URL}${movie.backdrop_path})`,
        }}
        data-swiper-parallax="-20%"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      <div className="relative z-10 h-full flex items-center px-6 md:px-16">
        <div className="max-w-xl space-y-4" data-swiper-parallax="-300">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white line-clamp-2">
            {movie.title}
          </h1>

          <p
            className="text-gray-200 text-sm md:text-base line-clamp-3"
            data-swiper-parallax="-200"
          >
            {movie.overview}
          </p>

          <div
            className="flex items-center gap-4 text-sm text-gray-300"
            data-swiper-parallax="-150"
          >
            <span className="text-green-400 font-semibold">
              ★ {movie.vote_average.toFixed(1)}
            </span>
            {year && <span>{year}</span>}
          </div>

          <div className="flex gap-3 pt-4" data-swiper-parallax="-100">
            <button className="bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-200 focus-visible:ring-2 focus-visible:ring-white">
              ▶ Play
            </button>
            <button className="bg-white/20 text-white px-6 py-2 rounded-md hover:bg-white/30 focus-visible:ring-2 focus-visible:ring-white">
              More info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
