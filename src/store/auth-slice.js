import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  loggedInUser: "",
  allowedUsers: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      console.log("action dispatched");
      // state.loggedInUserName = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      // state.loggedInUser = "";
    },
    setAllowedUsers: (state, action) => {
      state.allowedUsers = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
