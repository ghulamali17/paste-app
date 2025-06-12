import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: [], 
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      state.pastes.push(action.payload);
      toast.success("Snip Created Successfully");
    },
    updateToPaste: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex(p => p._id === updatedPaste._id);
      if (index >= 0) {
        state.pastes[index] = updatedPaste;
        toast.success("Snip Updated!");
      } else {
        toast.error("Paste not found!");
      }
    },
    removeFromPaste: (state, action) => {
      state.pastes = state.pastes.filter(p => p._id !== action.payload);
      toast.success("Snip Removed!");
    },
    resetAllPastes: (state) => {
      state.pastes = [];
      toast.success("All Pastes Deleted!");
    },
    setAllPastes: (state, action) => {
      state.pastes = action.payload;
    },
  },
});

export const {
  addToPaste,
  updateToPaste,
  removeFromPaste,
  resetAllPastes,
  setAllPastes,
} = pasteSlice.actions;

export default pasteSlice.reducer;
