import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./PasteSlice";
import themeReducer from "./ThemeSlice"; // ✅

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
    theme: themeReducer, // ✅
  },
});
