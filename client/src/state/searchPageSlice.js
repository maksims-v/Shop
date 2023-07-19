import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inputSearchValue: '',
  minPrice: 1,
  maxPrice: 10000,
  changeMinPrice: 1,
  changeMaxPrice: 10000,
  price: false,
};

export const searchPageSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    inputValue(state, action) {
      state.inputSearchValue = action.payload;
    },
    setMinPrice(state, action) {
      state.minPrice = action.payload;
    },
    setMaxPrice(state, action) {
      state.maxPrice = action.payload;
    },
    setChangeMinPrice(state, action) {
      state.changeMinPrice = action.payload;
    },
    setChangeMaxPrice(state, action) {
      state.changeMaxPrice = action.payload;
    },
    setPrice(state) {
      state.price = !state.price;
    },
  },
});

export const {
  inputValue,
  setMinPrice,
  setMaxPrice,
  setChangeMinPrice,
  setChangeMaxPrice,
  setPrice,
} = searchPageSlice.actions;

export default searchPageSlice.reducer;
