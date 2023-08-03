import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const search = createAsyncThunk(
  'shoppingCart/search',
  async function (value, { rejectWithValue, getState, dispatch }) {
    const { inputSearchValue } = getState().search;
    const { changePrice } = getState().search;
    const { brandsChecked } = getState().search;
    const { discounts } = getState().search;
    const { categoryChecked } = getState().search;
    const { genderChecked } = getState().search;
    const { subCategoryChecked } = getState().search;
    const { sizesChecked } = getState().search;
    const { currentPage } = getState().search;
    const { sortValue } = getState().search;

    console.log('1');
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/products?search=${inputSearchValue}&pmin=${
          changePrice[0]
        }&pmax=${
          changePrice[1]
        }&brands=${brandsChecked}&sale=${discounts}&category=${categoryChecked}&gender=${
          value ? value : genderChecked
        }&subcat=${subCategoryChecked}&size=${sizesChecked}&currentPage=${currentPage}&sort=${sortValue}`,
      );

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data = response.json();
      dispatch(getAllSizes());

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const getAllSizes = createAsyncThunk(
  'shoppingCart/getAllSizes',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${process.env.API_URL}/api/sizes`);

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data = response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  allSizesFromApi: [],
  pathname: '',
  status: null,
  error: null,
  data: [],
  metaData: [],
  inputSearchValue: '',
  newSearch: true,
  genders: [],
  genderChecked: [],
  discounts: [],
  category: [],
  categoryChecked: [],
  subCategory: [],
  subCategoryChecked: [],
  brands: [],
  brandsChecked: [],
  sizes: [],
  sizesChecked: [],
  priceMinAndMax: [1, 9999],
  changePrice: [1, 9999],
  currentPage: 1,
  sortValue: 'Sort By',
  searchFlag: false,
};

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

export const searchPageSlice = createSlice({
  name: 'shoppingCart',
  initialState,
  reducers: {
    setPathname(state, action) {
      state.pathname = action.payload;
    },
    setData(state, action) {
      state.data = action.payload;
    },
    setMetaData(state, action) {
      state.metaData = action.payload;
    },
    inputValue(state, action) {
      state.inputSearchValue = action.payload;
      state.newSearch = true;
    },
    setGenderChecked(state, action) {
      const itemSearch = state.genderChecked.includes(action.payload);

      !itemSearch
        ? state.genderChecked.push(action.payload)
        : (state.genderChecked = state.genderChecked.filter((item) => {
            return item !== action.payload;
          }));

      state.currentPage = 1;
      state.searchFlag = !state.searchFlag;
      state.newSearch = false;
    },
    setDiscounts(state, action) {
      const itemSearch = state.discounts.includes(action.payload);

      !itemSearch
        ? state.discounts.push(action.payload)
        : (state.discounts = state.discounts.filter((item) => {
            return item !== action.payload;
          }));

      state.currentPage = 1;
      state.searchFlag = !state.searchFlag;
      state.newSearch = false;
    },

    setCategoryChecked(state, action) {
      const itemSearch = state.categoryChecked.includes(action.payload);

      !itemSearch
        ? state.categoryChecked.push(action.payload)
        : (state.categoryChecked = state.categoryChecked.filter((item) => {
            return item !== action.payload;
          }));
      state.currentPage = 1;
      state.searchFlag = !state.searchFlag;
      state.newSearch = false;
    },
    setSubCategoryChecked(state, action) {
      const itemSearch = state.subCategoryChecked.includes(action.payload);

      !itemSearch
        ? state.subCategoryChecked.push(action.payload)
        : (state.subCategoryChecked = state.subCategoryChecked.filter((item) => {
            return item !== action.payload;
          }));
      state.currentPage = 1;
      state.searchFlag = !state.searchFlag;
      state.newSearch = false;
    },
    setBrandsChecked(state, action) {
      const itemSearch = state.brandsChecked.includes(action.payload);

      !itemSearch
        ? state.brandsChecked.push(action.payload)
        : (state.brandsChecked = state.brandsChecked.filter((item) => {
            return item !== action.payload;
          }));
      state.currentPage = 1;
      state.searchFlag = !state.searchFlag;
      state.newSearch = false;
    },
    setChangePrice(state, action) {
      if (
        state.changePrice[1] !== action.payload[1] ||
        state.changePrice[0] !== action.payload[0]
      ) {
        state.changePrice = action.payload;
      }

      state.currentPage = 1;
      state.searchFlag = !state.searchFlag;
      state.newSearch = false;
    },

    setSizesChecked(state, action) {
      state.sizesChecked = action.payload;
      state.searchFlag = !state.searchFlag;
      state.currentPage = 1;
      state.newSearch = false;
    },

    setCurrentPage(state, action) {
      state.currentPage = action.payload;
      state.newSearch = false;
      state.searchFlag = !state.searchFlag;
    },

    setSortValue(state, action) {
      state.sortValue = action.payload;
      state.newSearch = false;
      state.searchFlag = !state.searchFlag;
    },

    clearFilters(state) {
      state.status = null;
      state.error = null;
      state.data = [];
      state.metaData = [];
      state.inputSearchValue = state.inputSearchValue.length !== 0 ? state.inputSearchValue : '';
      state.newSearch = true;
      state.genders = [];
      state.genderChecked = [];
      state.discounts = [];
      state.category = [];
      state.categoryChecked = [];
      state.subCategory = [];
      state.subCategoryChecked = [];
      state.brands = [];
      state.brandsChecked = [];
      state.sizes = [];
      state.sizesChecked = [];
      state.price = [];
      state.priceMinAndMax = [1, 9999];
      state.changePrice = [1, 9999];
      state.currentPage = 1;
      state.sortValue = 'Sort By';
    },
  },
  extraReducers: {
    [search.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [search.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.data = action.payload.data;
      state.metaData = action.payload.meta;
      state.genders = state.newSearch ? action.payload.meta.genders : state.genders;
      state.brands = state.newSearch ? action.payload.meta.brands : state.brands;
      state.category = state.newSearch ? action.payload.meta.category : state.category;
      state.subCategory = state.newSearch ? action.payload.meta.subCategory : state.subCategory;
      state.priceMinAndMax = state.newSearch
        ? [action.payload.meta.priceMin, action.payload.meta.priceMax]
        : state.priceMinAndMax;

      state.sizes = state.newSearch ? action.payload.meta.sizes : state.sizes;
    },
    [search.rejected]: setError,

    [getAllSizes.fulfilled]: (state, action) => {
      state.allSizesFromApi = action.payload;

      const response = action.payload.data[0].attributes.size;
      const sizesArr = response.map((item) => {
        return item.size.toLowerCase();
      });
      state.allSizesFromApi = sizesArr;

      state.sizes = state.sizes.sort((a, b) => {
        return state.allSizesFromApi.indexOf(a) - state.allSizesFromApi.indexOf(b);
      });
    },
    [getAllSizes.rejected]: setError,
  },
});

export const {
  setPathname,
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
  setCurrentPage,
  setSortValue,
} = searchPageSlice.actions;

export default searchPageSlice.reducer;
