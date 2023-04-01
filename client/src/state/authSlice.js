import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  user: {
    email: '',
    name: '',
    surname: '',
    country: '',
    city: '',
    adress: '',
    postCode: '',
    phone: '',
  },
  orders: [
    { id: 1, type: 'boots', brand: 'ecco', size: '42', color: 'white' },
    { id: 2, type: 'clothing', brand: 'adidas', size: '50', color: 'yellow' },
    { id: 3, type: 'accessories', brand: 'ecco', size: '48', color: 'white' },
  ],
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
