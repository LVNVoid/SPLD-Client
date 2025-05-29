import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const user = action.payload;

      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast.success("Logout successful");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
