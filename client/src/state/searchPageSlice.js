import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// export const newInputSearch = createAsyncThunk(
//   'shoppingCart/newInputSearch',
//   async function (value, { rejectWithValue, getState, dispatch }) {
//     const { inputSearchValue } = getState().search;
//     console.log('1');
//     try {
//       const response = await fetch(
//         `${process.env.API_URL}/api/products?search=${inputSearchValue}&gender=${
//           value ? value : ''
//         }&pmin=1&pmax=10000&currentPage=1`,
//       );

//       if (!response.ok) {
//         throw new Error('Server Error!');
//       }

//       const data = response.json();

//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

export const search = createAsyncThunk(
  'shoppingCart/search',
  async function (value, { rejectWithValue, getState }) {
    const { inputSearchValue } = getState().search;
    const { changePrice } = getState().search;
    const { brandsChecked } = getState().search;
    const { discounts } = getState().search;
    const { categoryChecked } = getState().search;
    const { genderChecked } = getState().search;
    const { subCategoryChecked } = getState().search;
    const { sizesChecked } = getState().search;
    console.log('1');
    console.log(genderChecked);
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/products?search=${inputSearchValue}&pmin=${
          changePrice[0]
        }&pmax=${
          changePrice[1]
        }&brands=${brandsChecked}&sale=${discounts}&category=${categoryChecked}&gender=${
          value ? value : genderChecked
        }&subcat=${subCategoryChecked}&size=${sizesChecked}`,
      );

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
  price: [],
  changePrice: [1, 9999],
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
      state.searchFlag = !state.searchFlag;
    },

    setSizesChecked(state, action) {
      state.sizesChecked = action.payload;
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
      state.changePrice = [1, 9999];
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

      // state.brandsChecked = [];
      // state.categoryChecked = [];
      // state.genderChecked = [];
      // state.subCategoryChecked = [];
      state.sizes = action.payload.meta.sizes;
      // state.sizesChecked = [];
      // state.discounts = [];
      // state.newSearch = false;
    },
    [search.rejected]: setError,
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
} = searchPageSlice.actions;

export default searchPageSlice.reducer;
