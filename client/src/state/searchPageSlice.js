import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  metaData: [],
  inputSearchValue: '',
  newInputSearchValue: false,
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
      state.searchFlag = !state.searchFlag;
    },
    setNewInputSearchValue(state, action) {
      state.newInputSearchValue = action.payload;
    },
    setChangePrice(state, action) {
      state.changePrice = action.payload;
    },
    setBrandsChecked(state, action) {
      state.brandsChecked = action.payload;
      state.searchFlag = !state.searchFlag;
    },
    setCategoryChecked(state, action) {
      state.categoryChecked = action.payload;
      state.searchFlag = !state.searchFlag;
    },
    setGenderChecked(state, action) {
      state.genderChecked = action.payload;
      state.searchFlag = !state.searchFlag;
    },
    setSubCategoryChecked(state, action) {
      state.subCategoryChecked = action.payload;
      state.searchFlag = !state.searchFlag;
    },
    setSizesChecked(state, action) {
      state.sizesChecked = action.payload;
      state.searchFlag = !state.searchFlag;
    },
    setDiscounts(state, action) {
      state.discounts = action.payload;
      state.searchFlag = !state.searchFlag;
    },
    clearFilters(state) {
      state.brandsChecked = [];
      state.categoryChecked = [];
      state.genderChecked = [];
      state.subCategoryChecked = [];
      state.sizesChecked = [];
    },
  },
});

export const {
  setData,
  setMetaData,
  inputValue,
  setNewInputSearchValue,
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
