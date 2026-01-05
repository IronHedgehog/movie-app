import { useRef } from "react";

export const useMoviesCache = () => {
  const cache = useRef(new Map());

  const get = (key) => cache.current.get(key);
  const set = (key, value) => cache.current.set(key, value);
  const clear = () => cache.current.clear();

  return { get, set, clear };
};
