import { useRef, useEffect } from "react";

export const useAbortableFetch = () => {
  const controllerRef = useRef(null);

  const createSignal = () => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    return controllerRef.current.signal;
  };

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  return { createSignal };
};
