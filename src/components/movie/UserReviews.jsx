import { useGetMovieReviewsQuery } from "../../store/services/moviesApi";

const UserReviews = ({ movieId }) => {
  const { data, isLoading, isError } = useGetMovieReviewsQuery(movieId);

  if (isLoading)
    return (
      <div className="text-zinc-500 animate-pulse">Loading reviews...</div>
    );
  if (isError)
    return <div className="text-red-500">Failed to load reviews.</div>;

  const reviews = data?.results || [];

  if (reviews.length === 0) {
    return (
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-white mb-6">User Reviews</h3>
        <p className="text-zinc-500 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
          No reviews yet. Be the first to discuss this movie!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-white mb-6">
        User Reviews{" "}
        <span className="text-zinc-500 text-sm font-normal">
          ({reviews.length})
        </span>
      </h3>
      <div className="grid gap-4 md:grid-cols-2">
        {reviews.slice(0, 4).map(
          (
            review, // Показуємо максимум 4 відгуки, щоб не перевантажувати
          ) => (
            <div
              key={review.id}
              className="bg-zinc-900/40 p-5 rounded-xl border border-zinc-800/50 hover:bg-zinc-900/80 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-red-500 font-bold uppercase">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-medium">{review.author}</p>
                  {review.author_details?.rating && (
                    <p className="text-yellow-500 text-xs">
                      ⭐ {review.author_details.rating}/10
                    </p>
                  )}
                </div>
              </div>
              <p className="text-zinc-400 text-sm line-clamp-4 leading-relaxed">
                {review.content}
              </p>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default UserReviews;
