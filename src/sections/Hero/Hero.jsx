import { A11y, Autoplay, EffectFade, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import HeroSkeleton from "./HeroSkeleton";
import HeroSlide from "./HeroSlide";
import { useHeroMovies } from "./useHeroMovies";

import "swiper/css";
import "swiper/css/effect-fade";

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

export default function Hero() {
  const { movies, loading } = useHeroMovies();

  if (loading) return <HeroSkeleton />;
  if (!movies.length) return null;

  return (
    <section className="relative h-[85vh] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, A11y, Parallax]}
        effect={prefersReducedMotion ? "slide" : "fade"}
        speed={prefersReducedMotion ? 0 : 1000}
        autoplay={
          prefersReducedMotion
            ? false
            : { delay: 6000, disableOnInteraction: false }
        }
        loop
        parallax
        a11y
        className="h-full"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <HeroSlide movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
