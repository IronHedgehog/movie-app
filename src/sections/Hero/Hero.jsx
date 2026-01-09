import { A11y, Autoplay, EffectFade, Keyboard, Parallax } from "swiper/modules";
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
    <section
      className="relative h-[85vh] w-full overflow-hidden"
      aria-label="Featured movies"
    >
      <Swiper
        modules={[Autoplay, EffectFade, A11y, Parallax, Keyboard]}
        effect={prefersReducedMotion ? "slide" : "fade"}
        speed={prefersReducedMotion ? 0 : 1000}
        autoplay={
          prefersReducedMotion
            ? false
            : {
                delay: 6000,
                disableOnInteraction: false,
              }
        }
        keyboard={{ enabled: true }}
        a11y={{ enabled: true }}
        onSwiper={(swiper) => {
          const el = swiper.el;

          el.addEventListener("mouseenter", () => swiper.autoplay?.stop());
          el.addEventListener("mouseleave", () => swiper.autoplay?.start());
        }}
        loop
        parallax
        className="h-full"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <HeroSlide movie={movie} isPriority={index === 0} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
