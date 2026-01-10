import { useCallback, useState } from "react";

export function useHeaderState() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((v) => !v);
  }, []);

  const toggleSearch = useCallback(() => {
    setSearchOpen((v) => !v);
  }, []);

  const closeAll = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, []);

  return {
    isMenuOpen,
    isSearchOpen,
    toggleMenu,
    toggleSearch,
    closeAll,
  };
}
