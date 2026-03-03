import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  verdicts: {},
  chatHistory: [],
  isChatOpen: false,
  currentMovieContext: null, // Додаємо місце для збереження назви фільму
  isLoading: false,
  error: null,
};

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    saveVerdict: (state, action) => {
      const { movieId, verdict } = action.payload;
      state.verdicts[movieId] = verdict;
    },
    clearAiCache: (state) => {
      state.verdicts = {};
    },
    addMessage: (state, action) => {
      state.chatHistory.push(action.payload);
    },
    toggleChat: (state) => {
      state.isChatOpen = !state.isChatOpen;
    },
    // Новий екшен: записує фільм, про який зараз йде мова
    setChatContext: (state, action) => {
      state.currentMovieContext = action.payload;
    },
    resetChat: (state) => {
      state.chatHistory = [];
      state.currentMovieContext = null;
    },
  },
});

export const {
  saveVerdict,
  clearAiCache,
  addMessage,
  toggleChat,
  setChatContext,
  resetChat,
} = aiSlice.actions;
export default aiSlice.reducer;
