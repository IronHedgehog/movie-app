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
  const { data: reviewsData } = useGetMovieReviewsQuery(movie?.id, {
    skip: !movie?.id,
  });
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const generate = async () => {
      // Умови для виходу: якщо вже є вердикт, або немає даних для аналізу
      if (cachedVerdict || !reviewsData || !movie?.id || isGenerating) return;

      setIsGenerating(true);
      try {
        const resultText = await getMovieSummary(
          movie.title,
          movie.overview,
          reviewsData.results,
        );
        dispatch(saveVerdict({ movieId: movie.id, verdict: resultText }));
      } catch (error) {
        console.error("AI Verdict Error:", error);
      } finally {
        setIsGenerating(false);
      }
    };

    generate();
  }, [movie, reviewsData, cachedVerdict, dispatch]);

  const handleDiscuss = () => {
    dispatch(setChatContext(movie.title));
    dispatch(toggleChat());
  };

  return {
    verdict: cachedVerdict,
    isGenerating,
    handleDiscuss,
  };
};
