import { X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux"; // ✨ НОВЕ
import { closeAuthModal } from "../../../../store/slices/userSlice"; // ✨ НОВЕ
import AuthForm from "./AuthForm";
import SocialLogins from "./SocialLogins";

// ✨ ПРИБРАЛИ ПРОПСИ isOpen та onClose
export default function AuthModal() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  // ✨ Читаємо статус і функцію закриття з Redux
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.user.isAuthModalOpen);

  const handleClose = () => {
    dispatch(closeAuthModal());
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={handleClose} // Змінено на handleClose
    >
      <div
        className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white">
            {isLoginMode ? "Welcome Back" : "Create Account"}
          </h2>
          <button
            onClick={handleClose} // Змінено на handleClose
            className="text-zinc-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex bg-zinc-900 rounded-lg p-1">
            <button
              onClick={() => setIsLoginMode(true)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${isLoginMode ? "bg-zinc-800 text-white shadow" : "text-zinc-400 hover:text-white"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLoginMode(false)}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${!isLoginMode ? "bg-zinc-800 text-white shadow" : "text-zinc-400 hover:text-white"}`}
            >
              Register
            </button>
          </div>

          <AuthForm isLoginMode={isLoginMode} onSuccess={handleClose} />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-zinc-950 text-zinc-500">
                Or continue with
              </span>
            </div>
          </div>

          <SocialLogins onSuccess={handleClose} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
