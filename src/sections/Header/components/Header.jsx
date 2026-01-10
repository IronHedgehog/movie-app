import { useHeader } from "../hooks/useHeader";
import HeaderActions from "./HeaderActions";
import HeaderLogo from "./HeaderLogo";
import HeaderNav from "./HeaderNav";

export default function Header() {
  const { isScrolled, isVisible } = useHeader();

  return (
    <header
      className={`
        fixed top-0 z-50 w-full transition-all duration-300
        ${isVisible ? "translate-y-0" : "-translate-y-full"}
        ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }
      `}
    >
      <div className="mx-auto max-w-screen-xl h-[72px] flex items-center justify-between px-4">
        <HeaderLogo />
        <HeaderNav />
        <HeaderActions />
      </div>
    </header>
  );
}
