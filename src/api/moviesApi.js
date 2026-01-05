import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const instance = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY, language: "en-US" },
});

// Універсальна функція fetch через axios
export const fetchFromTMDB = async (endpoint, signal) => {
  try {
    const res = await instance.get(endpoint, { signal });
    return res.data;
  } catch (err) {
    if (axios.isCancel(err)) {
      // console.warn("Request cancelled:", endpoint);
      return { results: [] };
    }
    console.error("TMDB API error:", err);
    throw err;
  }
};

export const getPopularMovies = (page = 1, signal) =>
  fetchFromTMDB(`/movie/popular?page=${page}`, signal);

export const searchMovies = (query, page = 1, signal) => {
  if (!query) return Promise.resolve({ results: [] });
  return fetchFromTMDB(
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
    signal
  );
};

export const getMovieDetails = (id, signal) =>
  fetchFromTMDB(`/movie/${id}`, signal);
