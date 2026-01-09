import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
});

/**
 * Universal TMDB fetcher
 */
export const fetchFromTMDB = async (endpoint, signal, params = {}) => {
  try {
    const res = await instance.get(endpoint, {
      signal,
      params,
    });
    return res.data;
  } catch (err) {
    if (axios.isCancel(err)) {
      return { results: [] };
    }
    console.error("TMDB API error:", err);
    throw err;
  }
};

// =====================
// Movies
// =====================

export const getPopularMovies = (page = 1, signal) =>
  fetchFromTMDB("/movie/popular", signal, { page });

export const searchMovies = (query, page = 1, signal) => {
  if (!query) return Promise.resolve({ results: [] });

  return fetchFromTMDB("/search/movie", signal, {
    query,
    page,
  });
};

export const getMovieDetails = (id, signal) =>
  fetchFromTMDB(`/movie/${id}`, signal);

// =====================
// HERO
// =====================

export const getHeroMovies = async (signal) => {
  const data = await fetchFromTMDB("/movie/now_playing", signal, { page: 1 });

  if (!data?.results) return [];

  return data.results
    .filter((movie) => movie.backdrop_path && movie.overview && movie.title)
    .slice(0, 6);
};
