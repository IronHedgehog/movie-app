import { useSelector } from "react-redux";
import AppRouter from "./router/AppRouter";

function App() {
  // Витягуємо прапорець готовності авторизації з Redux
  const { isAuthReady } = useSelector((state) => state.user);

  // Поки Firebase перевіряє сесію, показуємо екран завантаження
  if (!isAuthReady) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <span className="text-6xl animate-bounce">🍿</span>
          <h1 className="text-2xl font-black text-accent animate-pulse tracking-widest uppercase">
            KinoBro
          </h1>
          <p className="text-zinc-500 text-sm">Перевіряємо квитки...</p>
        </div>
      </div>
    );
  }

  // Коли Firebase дав відповідь (є юзер чи ні), рендеримо весь додаток
  return <AppRouter />;
}

export default App;
