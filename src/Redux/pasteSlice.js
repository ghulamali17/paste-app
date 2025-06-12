import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Snip Created Successfully");
    },
    updateToPaste: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.pastes.findIndex(
        (item) => item._id === updatedPaste._id
      );
      if (index >= 0) {
        state.pastes[index] = updatedPaste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Snip Updated");
      } else {
        toast.error("Paste not found");
      }
    },
    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All Pastes Deleted");
    },
    removeFromPaste: (state, action) => {
      state.pastes = state.pastes.filter((item) => item._id !== action.payload);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Removed");
    },
    
  },
});

export const { addToPaste, updateToPaste, resetAllPastes, removeFromPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
