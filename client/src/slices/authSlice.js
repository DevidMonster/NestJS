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
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    deleteTokenAndUser: (state) => {
      state.token = "";
      state.user = {};
    },
  },
});

export const { saveTokenAndUser, deleteTokenAndUser } = authReducer.actions;

export default authReducer.reducer;