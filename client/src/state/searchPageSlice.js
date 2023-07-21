import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inputSearchValue: '',
  minPrice: 1,
  maxPrice: 10000,
  changeMinPrice: 1,
  changeMaxPrice: 10000,
  brands: [],
  brandsChecked: [],
};

export const searchPageSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    inputValue(state, action) {
      state.inputSearchValue = action.payload;
    },
    setMinPrice(state, action) {
      state.minPrice = Number(action.payload);
    },
    setMaxPrice(state, action) {
      state.maxPrice = Number(action.payload);
    },
    setChangeMinPrice(state, action) {
      state.changeMinPrice = Number(action.payload);
    },
    setChangeMaxPrice(state, action) {
      state.changeMaxPrice = Number(action.payload);
    },
    setBrands(state, action) {
      state.brands = action.payload;
    },
    setBrandsChecked(state, action) {
      state.brandsChecked = action.payload;
    },
  },
});

export const {
  inputValue,
  setMinPrice,
  setMaxPrice,
  setChangeMinPrice,
  setChangeMaxPrice,
  setBrands,
  setBrandsChecked,
} = searchPageSlice.actions;

export default searchPageSlice.reducer;
