import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  keepUnusedDataFor: 300,
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: ({
        page = 1,
        genre = "",
        yearFrom = "",
        yearTo = "",
        rating = 0,
      }) => {
        // ✨ ФІКС СКРОЛУ: Додано &vote_count.gte=50. Тепер сервер сам рахує правильні сторінки!
        let url = `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&vote_count.gte=50`;

        if (genre) url += `&with_genres=${genre}`;
        if (yearFrom) url += `&primary_release_date.gte=${yearFrom}-01-01`;
        if (yearTo) url += `&primary_release_date.lte=${yearTo}-12-31`;
        if (rating > 0) url += `&vote_average.gte=${rating}`;

        return url;
      },
      serializeQueryArgs: ({ queryArgs }) => {
        return `popular-${queryArgs.genre || "all"}-${queryArgs.yearFrom || "any"}-${queryArgs.yearTo || "any"}-${queryArgs.rating || 0}`;
      },
      transformResponse: (response) => {
        return {
          ...response,
          // ✨ Залишаємо тільки перевірку на постер, бо голоси вже відфільтрував сервер
          results: response.results.filter((movie) => movie.poster_path),
        };
      },
      merge: (currentCache, newItems) => {
        if (newItems.page === 1) return newItems;

        const currentIds = new Set(currentCache.results.map((m) => m.id));
        const uniqueNewResults = newItems.results.filter(
          (m) => !currentIds.has(m.id),
        );

        currentCache.results.push(...uniqueNewResults);
        currentCache.page = newItems.page;
        currentCache.total_pages = newItems.total_pages;
      },
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.genre !== previousArg?.genre ||
          currentArg?.yearFrom !== previousArg?.yearFrom ||
          currentArg?.yearTo !== previousArg?.yearTo ||
          currentArg?.rating !== previousArg?.rating
        );
      },
    }),

    searchMovies: builder.query({
      query: ({ query, page = 1 }) =>
        `/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`,
      serializeQueryArgs: ({ queryArgs }) => `search-${queryArgs.query}`,
      merge: (currentCache, newItems) => {
        if (newItems.page === 1) return newItems;

        const currentIds = new Set(currentCache.results.map((m) => m.id));
        const uniqueNewResults = newItems.results.filter(
          (m) => !currentIds.has(m.id),
        );

        currentCache.results.push(...uniqueNewResults);
        currentCache.page = newItems.page;
        currentCache.total_pages = newItems.total_pages;
      },
      forceRefetch({ currentArg, previousArg }) {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.query !== previousArg?.query
        );
      },
    }),

    getMovieDetails: builder.query({
      query: (id) => `/movie/${id}?api_key=${API_KEY}&language=en-US`,
    }),

    getMovieReviews: builder.query({
      query: ({ id, page = 1 }) =>
        `/movie/${id}/reviews?api_key=${API_KEY}&page=${page}`,
      serializeQueryArgs: ({ queryArgs }) => `getMovieReviews-${queryArgs.id}`,
      merge: (currentCache, newItems) => {
        if (newItems.page === 1) return newItems;

        const currentIds = new Set(currentCache.results.map((r) => r.id));
        const uniqueNewResults = newItems.results.filter(
          (r) => !currentIds.has(r.id),
        );

        currentCache.results.push(...uniqueNewResults);
        currentCache.page = newItems.page;
        currentCache.total_pages = newItems.total_pages;
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg?.page !== previousArg?.page;
      },
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
