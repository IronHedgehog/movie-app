import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  loginWithEmail,
  loginWithGithub,
  loginWithGoogle,
  logoutUser,
  registerWithEmail,
  fetchFavorites,
  toggleFavoriteMovie,
} from "../thunks/userThunks";

const initialState = {
  user: null,
  isAuthenticated: false,
  isAuthReady: false,
  isLoading: false,
  error: null,
  favorites: [],
  theme: "dark",
  isAuthModalOpen: false, // ✨ НОВЕ: Стан модалки
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isAuthReady = true;
    },
    // ✨ НОВЕ: Функції керування модалкою
    openAuthModal: (state) => {
      state.isAuthModalOpen = true;
    },
    closeAuthModal: (state) => {
      state.isAuthModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.favorites = [];
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(toggleFavoriteMovie.fulfilled, (state, action) => {
        const movieId = action.payload;
        if (state.favorites.includes(movieId)) {
          state.favorites = state.favorites.filter((id) => id !== movieId);
        } else {
          state.favorites.push(movieId);
        }
      })
      .addMatcher(
        isAnyOf(
          loginWithGoogle.pending,
          loginWithGithub.pending,
          loginWithEmail.pending,
          registerWithEmail.pending,
        ),
        (state) => {
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        isAnyOf(
          loginWithGoogle.fulfilled,
          loginWithGithub.fulfilled,
          loginWithEmail.fulfilled,
          registerWithEmail.fulfilled,
        ),
        (state, action) => {
          state.isLoading = false;
          state.user = action.payload;
          state.isAuthenticated = true;
          state.isAuthReady = true;
          // Можна автоматично закривати модалку при успішному вході:
          state.isAuthModalOpen = false;
        },
      )
      .addMatcher(
        isAnyOf(
          loginWithGoogle.rejected,
          loginWithGithub.rejected,
          loginWithEmail.rejected,
          registerWithEmail.rejected,
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

// Експортуємо нові екшени!
export const { setUser, openAuthModal, closeAuthModal } = userSlice.actions;
export default userSlice.reducer;
