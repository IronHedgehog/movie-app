import { getMovieSummary } from "@/store/services/geminiApi";
import { useGetMovieReviewsQuery } from "@/store/services/moviesApi";
import {
  saveVerdict,
  setChatContext,
  toggleChat,
} from "@/store/slices/aiSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useMovieVerdict = (movie) => {
  const dispatch = useDispatch();
  const cachedVerdict = useSelector((state) => state.ai.verdicts[movie?.id]);

  // ✨ ФІКС: Передаємо об'єкт { id: movie?.id }
  // ✨ ДОДАНО: Дістаємо isQueryError на випадок, якщо відгуки не завантажаться
  const { data: reviewsData, isError: isQueryError } = useGetMovieReviewsQuery(
    { id: movie?.id },
    { skip: !movie?.id },
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(false); // ✨ Стан для помилки AI

  useEffect(() => {
    const generate = async () => {
      if (cachedVerdict || !reviewsData || !movie?.id || isGenerating) return;

      setIsGenerating(true);
      setGenerationError(false);

      try {
        const resultText = await getMovieSummary(
          movie.title,
          movie.overview,
          reviewsData.results,
        );
        dispatch(saveVerdict({ movieId: movie.id, verdict: resultText }));
      } catch (error) {
        console.error("AI Verdict Error:", error);
        setGenerationError(true); // Ловимо помилку генерації
      } finally {
        setIsGenerating(false);
      }
    };

    generate();
    // Не додаємо isGenerating в масив залежностей, щоб уникнути зациклення
  }, [movie, reviewsData, cachedVerdict, dispatch]);

  const handleDiscuss = () => {
    dispatch(setChatContext(movie.title));
    dispatch(toggleChat());
  };

  return {
    verdict: cachedVerdict,
    isGenerating,
    handleDiscuss,
    error: isQueryError || generationError,
  };
};
