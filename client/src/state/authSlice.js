import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  user: {
    id: '',
    email: '',
    fullName: '',
    lastName: '',
    country: '',
    city: '',
    adress: '',
    postCode: '',
    phone: '',
    orders: [],
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn(state, actions) {
      state.isAuth = !state.isAuth;
      state.user = actions.payload;
    },
    saveChanges(state, actions) {
      state.user = actions.payload;
    },
  },
});

export const { logIn, saveChanges } = authSlice.actions;

export default authSlice.reducer;
