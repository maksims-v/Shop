import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: true,
  },
  reducers: {
    logIn(state) {
      state.isAuth = !state.isAuth;
    },
  },
});

export const { logIn } = authSlice.actions;

export default authSlice.reducer;
