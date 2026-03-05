import SearchBar from "@/components/SearchBar/SearchBar";
import ThemeToggle from "@/components/UI/ThemeToggle";
import UserMenu from "./UserMenu"; // Додаємо імпорт

export default function HeaderActions() {
  return (
    <div className="flex items-center gap-4">
      <SearchBar />
      <ThemeToggle />

      {/* Вертикальна лінія-розділювач для краси (опціонально) */}
      <div className="hidden sm:block w-[1px] h-6 bg-gray-700"></div>

      {/* Наш новий компонент авторизації */}
      <UserMenu />
    </div>
  );
}
