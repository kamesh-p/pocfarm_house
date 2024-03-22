import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllowedUsers = createAsyncThunk(
  "user/fetchAllowedUsers",
  async () => {
    try {
      const response = await fetch(
        "https://add-to-card-a30ca-default-rtdb.firebaseio.com/allowedUsers.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch allowed user data.");
      }
      const data = await response.json();

      const usersArray = Object.keys(data).map((key) => {
        return {
          id: key,
          ...data[key],
        };
      });

      return usersArray;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const initialState = {
  allowedUsers: [],
  loggedInUser: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      const { username, password } = action.payload;

      // Find the user with matching username and password
      const loggedInUser = state.allowedUsers.find(
        (user) => user.username === username && user.password === password
      );

      if (loggedInUser) {
        state.loggedInUser = loggedInUser.name;
      } else {
        state.loggedInUser = null;
      }
    },
    logout(state) {
      state.loggedInUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllowedUsers.fulfilled, (state, action) => {
      state.allowedUsers = action.payload;
    });
  },
});

export const { login, logout } = userSlice.actions;
export const userActions = { ...userSlice.actions, fetchAllowedUsers };
export const userReducer = userSlice.reducer;
