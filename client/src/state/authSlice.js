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
      state.user.email = actions.payload.email;
      state.user.name = actions.payload.fullName;
      state.user.surname = actions.payload.lastName;
      state.user.country = actions.payload.country;
      state.user.city = actions.payload.city;
      state.user.adress = actions.payload.adress;
      state.user.postCode = actions.payload.postCode;
      state.user.phone = actions.payload.phone;
    },
    saveChanges(state, actions) {
      state.user = actions.payload;
    },
  },
});

export const { logIn, saveChanges } = authSlice.actions;

export default authSlice.reducer;
