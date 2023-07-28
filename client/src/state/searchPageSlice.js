import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  metaData: [],
  inputSearchValue: '',
  changePrice: [1, 10000],
  brandsChecked: [],
  categoryChecked: [],
  genderChecked: [],
  subCategoryChecked: [],
  sizesChecked: [],
  discounts: [],
  searchFlag: false,
};

export const searchPageSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setMetaData(state, action) {
      state.metaData = action.payload;
    },
    inputValue(state, action) {
      state.inputSearchValue = action.payload;
    },
    setChangePrice(state, action) {
      state.changePrice = action.payload;
    },
    setBrandsChecked(state, action) {
      state.brandsChecked = action.payload;
    },
    setCategoryChecked(state, action) {
      state.categoryChecked = action.payload;
    },
    setGenderChecked(state, action) {
      state.genderChecked = action.payload;
    },
    setSubCategoryChecked(state, action) {
      state.subCategoryChecked = action.payload;
    },
    setSizesChecked(state, action) {
      state.sizesChecked = action.payload;
    },
    setDiscounts(state, action) {
      state.discounts = action.payload;
    },
    clearFilters(state) {
      state.brandsChecked = [];
      state.categoryChecked = [];
      state.genderChecked = [];
      state.subCategoryChecked = [];
      state.sizesChecked = [];
      // state.changePrice = [1, 9999];
    },
  },
});

export const {
  setData,
  setMetaData,
  inputValue,
  setBrandsChecked,
  setCategoryChecked,
  setGenderChecked,
  setSubCategoryChecked,
  setDiscounts,
  setSizesChecked,
  clearFilters,
  setChangePrice,
} = searchPageSlice.actions;

export default searchPageSlice.reducer;
