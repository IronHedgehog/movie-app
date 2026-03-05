// src/store/thunks/userThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore"; // НОВЕ: Імпорт методів бази даних
import { auth, db, githubProvider, googleProvider } from "../services/firebase"; // НОВЕ: Імпортуємо db

export const loginWithGoogle = createAsyncThunk(
  "user/loginWithGoogle",
  async (_, { dispatch, rejectWithValue }) => {
    // ✨ ДОДАНО dispatch
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { uid, displayName, email, photoURL } = result.user;

      // ✨ Миттєво тягнемо лайки після входу
      dispatch(fetchFavorites(uid));

      return { uid, displayName, email, photoURL };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loginWithGithub = createAsyncThunk(
  "user/loginWithGithub",
  async (_, { dispatch, rejectWithValue }) => {
    // ✨ ДОДАНО dispatch
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const { uid, displayName, email, photoURL } = result.user;

      // ✨ Миттєво тягнемо лайки після входу
      dispatch(fetchFavorites(uid));

      return { uid, displayName, email, photoURL };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const registerWithEmail = createAsyncThunk(
  "user/registerWithEmail",
  async ({ email, password, name }, { dispatch, rejectWithValue }) => {
    // ✨ ДОДАНО dispatch
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      });

      const { uid, photoURL } = userCredential.user;

      // ✨ Створюємо порожній список у Firestore одразу при реєстрації
      dispatch(fetchFavorites(uid));

      return { uid, email, displayName: name, photoURL };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const loginWithEmail = createAsyncThunk(
  "user/loginWithEmail",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    // ✨ ДОДАНО dispatch
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const {
        uid,
        displayName,
        email: userEmail,
        photoURL,
      } = userCredential.user;

      // ✨ Миттєво тягнемо лайки після входу
      dispatch(fetchFavorites(uid));

      return { uid, displayName, email: userEmail, photoURL };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// --- FIRESTORE THUNKS ---

// Отримуємо або створюємо список улюблених фільмів
export const fetchFavorites = createAsyncThunk(
  "user/fetchFavorites",
  async (uid, { rejectWithValue }) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        return docSnap.data().favorites || [];
      } else {
        await setDoc(userDocRef, { favorites: [] });
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Змінюємо статус "Улюблене" в базі даних
export const toggleFavoriteMovie = createAsyncThunk(
  "user/toggleFavoriteMovie",
  async (movieId, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const uid = state.user.user?.uid;
      const favorites = state.user.favorites;

      if (!uid) throw new Error("Please login to add to favorites");

      const userDocRef = doc(db, "users", uid);
      const isFavorite = favorites.includes(movieId);

      if (isFavorite) {
        await updateDoc(userDocRef, {
          favorites: arrayRemove(movieId),
        });
      } else {
        await updateDoc(userDocRef, {
          favorites: arrayUnion(movieId),
        });
      }

      return movieId; // Повертаємо ID для локального оновлення UI
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
