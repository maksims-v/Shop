import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const newInputSearch = createAsyncThunk(
  'shoppingCart/newInputSearch',
  async function (_, { rejectWithValue, getState, dispatch }) {
    const { inputSearchValue } = getState().search;

    console.log('1');
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/products?search=${inputSearchValue}&pmin=1&pmax=10000&currentPage=1`,
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

export const filtersSearch = createAsyncThunk(
  'shoppingCart/filtersSearch',
  async function (_, { rejectWithValue, getState }) {
    const { inputSearchValue } = getState().search;
    const { changePrice } = getState().search;
    const { brandsChecked } = getState().search;
    const { discounts } = getState().search;
    const { categoryChecked } = getState().search;
    const { genderChecked } = getState().search;
    const { subCategoryChecked } = getState().search;
    const { sizesChecked } = getState().search;
    console.log('2');
    try {
      const response = await fetch(
        `${process.env.API_URL}/api/products?search=${inputSearchValue}&pmin=${changePrice[0]}&pmax=${changePrice[1]}&brands=${brandsChecked}&sale=${discounts}&category=${categoryChecked}&gender=${genderChecked}&subcat=${subCategoryChecked}&size=${sizesChecked}`,
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
  status: null,
  error: null,
  data: [],
  metaData: [],
  inputSearchValue: '',
  genderChecked: [],
  discounts: [],
  categoryChecked: [],
  subCategoryChecked: [],
  brandsChecked: [],
  sizesChecked: [],
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
    setData(state, action) {
      state.data = action.payload;
    },
    setMetaData(state, action) {
      state.metaData = action.payload;
    },
    inputValue(state, action) {
      state.inputSearchValue = action.payload;
    },
    setGenderChecked(state, action) {
      const itemSearch = state.genderChecked.includes(action.payload);

      !itemSearch
        ? state.genderChecked.push(action.payload)
        : (state.genderChecked = state.genderChecked.filter((item) => {
            return item !== action.payload;
          }));

      state.searchFlag = !state.searchFlag;
    },
    setDiscounts(state, action) {
      if (state.discounts.length !== action.payload.length) {
        state.discounts = action.payload;
        state.searchFlag = !state.searchFlag;
      }
    },
    setCategoryChecked(state, action) {
      if (state.categoryChecked.length !== action.payload.length) {
        state.categoryChecked = action.payload;
        state.searchFlag = !state.searchFlag;
      }
    },
    setSubCategoryChecked(state, action) {
      state.subCategoryChecked = action.payload;
      state.searchFlag = !state.searchFlag;
      // if (state.subCategoryChecked.length !== action.payload.length) {
      //   state.subCategoryChecked = action.payload;
      //   state.searchFlag = !state.searchFlag;
      // }
    },
    setBrandsChecked(state, action) {
      if (state.brandsChecked.length !== action.payload.length) {
        state.brandsChecked = action.payload;
        state.searchFlag = !state.searchFlag;
      }
    },
    setChangePrice(state, action) {
      if (
        state.changePrice[1] !== action.payload[1] ||
        state.changePrice[0] !== action.payload[0]
      ) {
        state.changePrice = action.payload;
      }
    },

    setSizesChecked(state, action) {
      state.sizesChecked = action.payload;
    },

    clearFilters(state) {
      state.brandsChecked = [];
      state.categoryChecked = [];
      state.genderChecked = [];
      state.subCategoryChecked = [];
      state.sizesChecked = [];
      state.discounts = [];
      state.changePrice = [1, 9999];
    },
  },
  extraReducers: {
    [newInputSearch.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [newInputSearch.fulfilled]: (state, action) => {
      state.data = action.payload.data;
      state.metaData = action.payload.meta;
      state.brandsChecked = [];
      state.categoryChecked = [];
      state.genderChecked = [];
      state.subCategoryChecked = [];
      state.sizesChecked = [];
      state.discounts = [];
      state.status = 'resolved';
    },
    [newInputSearch.rejected]: setError,

    [filtersSearch.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [filtersSearch.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.data = action.payload.data;
    },
    [filtersSearch.rejected]: setError,
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
