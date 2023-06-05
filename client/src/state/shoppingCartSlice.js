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
      localStorage.setItem('cart', JSON.stringify(state.basket));
    },
  },
});

export const { addToBasket } = shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
