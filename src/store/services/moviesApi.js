import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  // Кешування: як довго зберігати дані, якщо компонент розмонтувався (в секундах)
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: (page = 1) =>
        `/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
    }),

    searchMovies: builder.query({
      query: ({ query, page = 1 }) =>
        `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`,
    }),

    getMovieDetails: builder.query({
      query: (id) => `/movie/${id}?api_key=${API_KEY}&language=en-US`,
    }),
    getMovieReviews: builder.query({
      query: (id) => `/movie/${id}/reviews?api_key=${API_KEY}`,
    }),

    getHeroMovies: builder.query({
      query: () =>
        `/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`,

      transformResponse: (response) => {
        return response.results
          .filter(
            (movie) => movie.backdrop_path && movie.overview && movie.title,
          )
          .slice(0, 6);
      },
    }),
  }),
});

export const {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsQuery,
  useGetHeroMoviesQuery,
  useGetMovieReviewsQuery,
} = moviesApi;
