import SearchBar from "@/components/SearchBar/SearchBar";
import ThemeToggle from "@/components/UI/ThemeToggle";

export default function HeaderActions() {
  return (
    <div className="flex items-center gap-4">
      <SearchBar />
      <ThemeToggle />
    </div>
  );
}
