import { useHeaderScroll } from "../hooks/useHeaderScroll";
import { useHeaderState } from "../hooks/useHeaderState";
import { HeaderContext } from "./HeaderContext";

export function HeaderProvider({ children }) {
  const scroll = useHeaderScroll();
  const state = useHeaderState();

  const value = {
    ...scroll,
    ...state,
  };

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}
