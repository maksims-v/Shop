import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  basket: [],
  items: [],
};

export const shoppingCartSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    addToBasket(state, action) {
      state.basket = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.basket));
      }
    },
    basketReset(state) {
      state.basket = [];
      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.basket));
      }
    },
  },
});

export const { addToBasket, basketReset } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
