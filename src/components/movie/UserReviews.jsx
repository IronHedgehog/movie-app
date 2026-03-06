import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetMovieReviewsQuery } from "../../store/services/moviesApi";

const UserReviews = ({ movieId }) => {
  const [page, setPage] = useState(1); // ✨ НОВЕ: Стан сторінки для відгуків

  // Передаємо page у запит
  const { data, isLoading, isError } = useGetMovieReviewsQuery({
    id: movieId,
    page,
  });

  const reviews = data?.results || [];
  const totalPages = data?.total_pages || 1;
  const hasMore = page < totalPages;

  const loadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  // Показуємо повний скелетон тільки на першому завантаженні
  if (isLoading && page === 1)
    return (
      <div className="animate-pulse py-10 text-zinc-600">
        Аналізуємо думки...
      </div>
    );

  if (isError) {
    return (
      <div className="mt-20 py-12 border border-dashed border-red-900/50 rounded-3xl flex flex-col items-center justify-center bg-red-950/10">
        <span className="text-4xl mb-4">🎬🔥</span>
        <h3 className="text-xl font-bold text-red-500 mb-2">От халепа, Бро!</h3>
        <p className="text-zinc-500 text-sm">
          Не вдалося завантажити відгуки. Схоже, сервери TMDB пішли за
          попкорном.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <h3 className="text-3xl font-bold text-white mb-8 tracking-tight">
        Що кажуть бро{" "}
        <span className="text-zinc-600 ml-2">
          {data?.total_results || reviews.length}
        </span>
      </h3>

      {reviews.length > 0 ? (
        <InfiniteScroll
          dataLength={reviews.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <div className="text-center text-accent py-4 animate-pulse">
              Ще відгуки...
            </div>
          }
          style={{ overflow: "hidden" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-zinc-900/30 p-6 rounded-2xl border border-zinc-800/50 hover:border-zinc-700 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-zinc-800 flex items-center justify-center text-white font-black text-xl shadow-lg">
                    {rev.author[0]}
                  </div>
                  <div>
                    <h4 className="text-white font-bold group-hover:text-red-500 transition-colors">
                      {rev.author}
                    </h4>
                    <p className="text-zinc-500 text-xs">Verified Critic</p>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-5">
                  {rev.content}
                </p>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="col-span-full py-10 border-2 border-dashed border-zinc-800 rounded-3xl flex items-center justify-center text-zinc-600">
          Поки ніхто не лишив відгуку. Будь першим!
        </div>
      )}
    </div>
  );
};

export default UserReviews;
