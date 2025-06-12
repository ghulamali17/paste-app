import { configureStore } from "@reduxjs/toolkit";
import pasteReducer from "./PasteSlice";
import themeReducer from "./ThemeSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    paste: pasteReducer,
    theme: themeReducer,
    user: userReducer,
  },
});
