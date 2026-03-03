import React from "react";
import { Bot } from "lucide-react";
import { useMovieVerdict } from "@/hooks/useMovieVerdict";

const MovieAiVerdict = ({ movie }) => {
  const { verdict, isGenerating, handleDiscuss } = useMovieVerdict(movie);

  // Якщо немає ні вердикту, ні процесу генерації — не займаємо місце
  if (!isGenerating && !verdict) return null;

  return (
    <div className="bg-zinc-900 border-l-4 border-accent p-5 my-8 rounded-r-2xl shadow-lg transition-all">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-accent/20 rounded-full">
          <Bot size={24} className="text-accent" />
        </div>
        <h3 className="text-lg font-bold text-zinc-100 italic">
          Вердикт КіноБро 🍿
        </h3>
      </div>

      <div className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line min-h-[40px]">
        {isGenerating ? (
          <div className="flex items-center gap-2 animate-pulse text-zinc-500">
            <span className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" />
            <span>КіноБро вивчає відгуки глядачів...</span>
          </div>
        ) : (
          verdict
        )}
      </div>

      {!isGenerating && verdict && (
        <button
          onClick={handleDiscuss}
          className="mt-5 text-sm font-medium text-accent hover:text-white transition-colors underline decoration-accent/30 underline-offset-8"
        >
          Обговорити деталі з бро...
        </button>
      )}
    </div>
  );
};

export default MovieAiVerdict;
