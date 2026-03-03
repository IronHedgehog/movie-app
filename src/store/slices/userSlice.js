import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // { id: 1, name: "Ihor", email: "..." }
  isAuthenticated: false,
  favorites: [], // масив ID улюблених фільмів
  theme: "dark", // якщо дуже хочеться тримати тут
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.favorites = [];
    },
    toggleFavorite: (state, action) => {
      const movieId = action.payload;
      if (state.favorites.includes(movieId)) {
        state.favorites = state.favorites.filter((id) => id !== movieId);
      } else {
        state.favorites.push(movieId);
      }
    },
  },
});

export const { login, logout, toggleFavorite } = userSlice.actions;
export default userSlice.reducer;
