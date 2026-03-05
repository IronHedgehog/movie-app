import { useGetMovieReviewsQuery } from "../../store/services/moviesApi";

const UserReviews = ({ movieId }) => {
  const { data, isLoading } = useGetMovieReviewsQuery(movieId);
  const reviews = data?.results || [];

  if (isLoading)
    return (
      <div className="animate-pulse py-10 text-zinc-600">
        Аналізуємо думки...
      </div>
    );

  return (
    <div className="mt-20">
      <h3 className="text-3xl font-bold text-white mb-8 tracking-tight">
        Що кажуть бро{" "}
        <span className="text-zinc-600 ml-2">{reviews.length}</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.length > 0 ? (
          reviews.slice(0, 4).map((rev) => (
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
          ))
        ) : (
          <div className="col-span-full py-10 border-2 border-dashed border-zinc-800 rounded-3xl flex items-center justify-center text-zinc-600">
            Поки ніхто не лишив відгуку. Будь першим!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserReviews;
