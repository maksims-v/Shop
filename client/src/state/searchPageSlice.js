import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inputSearchValue: '',
  minPrice: 1,
  maxPrice: 10000,
  changeMinPrice: 1,
  changeMaxPrice: 10000,
  brands: [],
  brandsChecked: [],
  category: [],
  categoryChecked: [],
  gender: [],
  genderChecked: [],
  subCategory: [],
  subCategoryChecked: [],
  sizes: [],
  sizesChecked: [],
  discounts: [],
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
    setCategory(state, action) {
      state.category = action.payload;
    },
    setCategoryChecked(state, action) {
      state.categoryChecked = action.payload;
    },
    setGender(state, action) {
      state.gender = action.payload;
    },
    setGenderChecked(state, action) {
      state.genderChecked = action.payload;
    },
    setSubCategory(state, action) {
      state.subCategory = action.payload;
    },
    setSubCategoryChecked(state, action) {
      state.subCategoryChecked = action.payload;
    },
    setSizes(state, action) {
      state.sizes = action.payload;
    },
    setSizesChecked(state, action) {
      state.sizesChecked = action.payload;
    },
    setDiscounts(state, action) {
      state.discounts = action.payload;
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
  setCategory,
  setCategoryChecked,
  setGender,
  setGenderChecked,
  setSubCategory,
  setSubCategoryChecked,
  setDiscounts,
  setSizes,
  setSizesChecked,
} = searchPageSlice.actions;

export default searchPageSlice.reducer;
