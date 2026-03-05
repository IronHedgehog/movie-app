import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavoriteMovie } from "../../store/thunks/userThunks";
import { openAuthModal } from "../../store/slices/userSlice"; // ✨ НОВЕ

const FavoriteButton = ({ movieId }) => {
  const dispatch = useDispatch();

  const { favorites, isAuthenticated } = useSelector((state) => state.user);
  const isFavorite = favorites.includes(movieId);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      // ✨ ВІДКРИВАЄМО МОДАЛКУ ЧЕРЕЗ REDUX
      dispatch(openAuthModal());
      return;
    }

    dispatch(toggleFavoriteMovie(movieId));
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className="
        absolute top-2 right-2 z-10 
        p-2 rounded-full 
        bg-black/50 backdrop-blur-sm 
        transition-all duration-300 
        hover:bg-black/70 hover:scale-110 active:scale-95
      "
    >
      <Heart
        size={20}
        className={`transition-colors duration-300 ${
          isFavorite
            ? "fill-red-500 text-red-500"
            : "text-zinc-300 hover:text-white"
        }`}
      />
    </button>
  );
};

export default FavoriteButton;
