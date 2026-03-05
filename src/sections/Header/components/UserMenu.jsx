import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openAuthModal } from "../../../store/slices/userSlice.js"; // ✨ НОВЕ: Імпортуємо екшен відкриття
import { logoutUser } from "../../../store/thunks/userThunks.js";
import AuthModal from "./Auth/AuthModal";

export default function UserMenu() {
  const dispatch = useDispatch();

  // ✨ НОВЕ: Дістаємо isAuthModalOpen з Redux
  const { user, isAuthenticated, isLoading, isAuthModalOpen } = useSelector(
    (state) => state.user,
  );

  const [isOpen, setIsOpen] = useState(false); // Для випадаючого меню профілю
  // ❌ Локальний стейт модалки (isModalOpen) ВИДАЛЕНО

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Показуємо скелетон ТІЛЬКИ якщо ми не в процесі логіну через модалку.
  if (isLoading && !isAuthModalOpen) {
    return (
      <div className="animate-pulse bg-white/10 h-9 w-24 rounded-md flex items-center justify-center">
        <span className="text-gray-400 text-xs">Loading...</span>
      </div>
    );
  }

  // Стан 1: Юзер НЕ авторизований
  if (!isAuthenticated || !user) {
    return (
      <>
        <button
          onClick={() => dispatch(openAuthModal())} // ✨ НОВЕ: Відкриваємо через Redux
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-md shadow-red-600/20"
        >
          Sign In
        </button>

        {/* ✨ НОВЕ: Модалка без пропсів (Smart Component) */}
        <AuthModal />
      </>
    );
  }

  // Стан 2: Юзер авторизований (Аватарка + Dropdown)
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 focus:outline-none transition-transform hover:scale-105"
      >
        <img
          src={user.photoURL}
          alt={user.displayName}
          referrerPolicy="no-referrer"
          className={`w-9 h-9 rounded-full object-cover border-2 transition-colors ${isOpen ? "border-red-600" : "border-transparent"}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-48 bg-black/95 backdrop-blur-md border border-gray-800 rounded-lg py-2 shadow-2xl z-50 flex flex-col overflow-hidden">
          <div className="px-4 py-2 border-b border-gray-800">
            <p className="text-sm font-bold text-white truncate">
              {user.displayName || "Бро"}
            </p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>

          <button className="text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors mt-1">
            Profile
          </button>
          <button className="text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
            My Favorites
          </button>

          <div className="h-[1px] bg-gray-800 my-1"></div>

          <button
            onClick={() => {
              setIsOpen(false);
              dispatch(logoutUser());
            }}
            className="text-left px-4 py-2 text-sm text-red-500 hover:bg-red-500/10 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Модалку можна залишити і тут про всяк випадок, але оскільки 
        ми рендеримо її у "Стан 1" і після логіну вона автоматично 
        зникає — цього достатньо! 
      */}
    </div>
  );
}
