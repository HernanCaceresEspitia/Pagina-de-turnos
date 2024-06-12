  import { createSlice } from "@reduxjs/toolkit";

  export const userSlice = createSlice({
    name: "user",
    initialState: {
      id: null,
      isLoggedIn: false,
      name: '', 
      notification: ''
    },
    reducers: {
      login: (state, action) => {
        state.id = action.payload.id;
        state.isLoggedIn = true;
        state.notification = action.payload.notification;
      },
      logout: (state) => {
        state.userId = null;
        state.isLoggedIn = false;
      },
      clearNotification: (state) => {
        state.notification = '';
      },
    },
  });

  export const { login, logout, clearNotification } = userSlice.actions;
  export default userSlice.reducer;
