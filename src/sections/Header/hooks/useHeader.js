import { useContext } from "react";
import { HeaderContext } from "../context/HeaderContext";

export function useHeader() {
  const ctx = useContext(HeaderContext);

  if (!ctx) {
    throw new Error("useHeader must be used inside HeaderProvider");
  }

  return ctx;
}
