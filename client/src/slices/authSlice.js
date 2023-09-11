import { createSlice } from "@reduxjs/toolkit";

const initState = {
  token: "",
  user: {},
};

const authReducer = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    saveTokenAndUser: (state, action) => {
      localStorage.setItem("auth", JSON.stringify(action.payload.user) || {});
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    deleteTokenAndUser: (state) => {
      localStorage.removeItem("auth");
      state.token = "";
      state.user = {};
    },
  },
});

export const { saveTokenAndUser, deleteTokenAndUser } = authReducer.actions;

export default authReducer.reducer;