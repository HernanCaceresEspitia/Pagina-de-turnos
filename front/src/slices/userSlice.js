  import { createSlice } from "@reduxjs/toolkit";

  export const userSlice = createSlice({
    name: "user",
    initialState: {
      id: null,
      isLoggedIn: false,
    },
    reducers: {
      login: (state, action) => {
        state.id = action.payload.id;
        state.isLoggedIn = true;
      },
      logout: (state) => {
        state.userId = null;
        state.isLoggedIn = false;
      },
    },
  });

  export const { login, logout } = userSlice.actions;
  export default userSlice.reducer;
