import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  items: [],
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart = action.payload;
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const { addToCart } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
