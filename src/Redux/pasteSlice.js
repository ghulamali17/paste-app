import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("paste")
    ? JSON.parse(localStorage.getItem("paste"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const paste = action.payload;
      // add check for same title  (optional)
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Succcessfully");
    },
    updateToPaste: (state, action) => {
      const update = action.payload;
      const index = state.pastes.findIndex((item) => {
        item._id === paste._id;
        if (index >= 0) {
          state.pastes[index] = paste;
          localStorage.setItem("pastes", JSON.stringify(state.pastes));
          toast.success("Paste Updated");
        }
      });
    },
    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("Paste Delete");
    },
    removeFromPaste: (state, action) => {
      state.pastes = state.pastes.filter((item) => item.id !== action.payload);
    },
  },
});
export const { addToPaste, updateToPaste, resetAllPastes, removeFromPaste } =
  pasteSlice.actions;

export default pasteSlice.reducer;
