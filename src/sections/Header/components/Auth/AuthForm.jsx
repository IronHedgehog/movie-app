import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as z from "zod";
import {
  loginWithEmail,
  registerWithEmail,
} from "../../../../store/thunks/userThunks";

// Базова схема (тільки для логіну)
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Розширена схема (для реєстрації)
const registerSchema = loginSchema.extend({
  name: z.string().min(2, "Nickname must be at least 2 characters"),
});

export default function AuthForm({ isLoginMode, onSuccess }) {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);

  // Ініціалізація React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isLoginMode ? loginSchema : registerSchema),
    mode: "onBlur", // Валідація відбувається, коли користувач покидає поле
  });

  const onSubmit = async (data) => {
    const action = isLoginMode ? loginWithEmail(data) : registerWithEmail(data);
    const result = await dispatch(action);
    if (!result.error) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">
      {/* Вивід помилки Firebase */}
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
          {error}
        </div>
      )}

      {/* Поле імені (тільки для реєстрації) */}
      {!isLoginMode && (
        <div>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              size={18}
            />
            <input
              {...register("name")}
              type="text"
              placeholder="Nickname"
              className={`w-full bg-zinc-900 border rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:outline-none transition-colors ${errors.name ? "border-red-500" : "border-zinc-700 focus:border-red-600"}`}
            />
          </div>
          {errors.name && (
            <span className="text-red-500 text-xs mt-1 block">
              {errors.name.message}
            </span>
          )}
        </div>
      )}

      {/* Поле Email */}
      <div>
        <div className="relative">
          <Mail
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />
          <input
            {...register("email")}
            type="email"
            placeholder="Email Address"
            className={`w-full bg-zinc-900 border rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:outline-none transition-colors ${errors.email ? "border-red-500" : "border-zinc-700 focus:border-red-600"}`}
          />
        </div>
        {errors.email && (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Поле Password */}
      <div>
        <div className="relative">
          <Lock
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            size={18}
          />
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className={`w-full bg-zinc-900 border rounded-lg py-2.5 pl-10 pr-4 text-white placeholder:text-zinc-500 focus:outline-none transition-colors ${errors.password ? "border-red-500" : "border-zinc-700 focus:border-red-600"}`}
          />
        </div>
        {errors.password && (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.password.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-lg transition-colors disabled:opacity-50 flex justify-center"
      >
        {isLoading ? (
          <span className="animate-pulse">Processing...</span>
        ) : isLoginMode ? (
          "Sign In"
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}
