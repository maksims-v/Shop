import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// console.log(inputSearchValue);
// console.log(changePrice);
// console.log(brandsChecked);
// console.log(sale);
// console.log(categoryChecked);
// console.log(pageCategoryChecked);
// console.log(subCategoryChecked);
// console.log(currentPage);
// console.log(sortValue);

const toggleItemInArray = (array, item) => {
  return array.includes(item) ? array.filter((i) => i !== item) : [...array, item];
};

const updateSearchState = (state) => {
  state.currentPage = 1;
  state.searchFlag = !state.searchFlag;
  state.newSearch = false;
};

export const search = createAsyncThunk(
  'shoppingCart/search',
  async function (value, { rejectWithValue, getState, dispatch }) {
    const {
      inputSearchValue,
      changePrice,
      brandsChecked,
      sale,
      categoryChecked,
      pageCategoryChecked,
      subCategoryChecked,
      sizesChecked,
      currentPage,
      sortValue,
    } = getState().searchPageSlice;

    const getPageCategoryValue =
      value?.pageCategory !== 'all' ? value.pageCategory : pageCategoryChecked;
    const getCategoryValue = value?.category ? value.category : categoryChecked;
    const getSubCategoryValue = value?.subcategory ? value.subcategory : subCategoryChecked;
    const saleproducts = sale ? 'Sale' : '';

    try {
      const response = await fetch(
        `${process.env.API_URL}/api/products/search?search=${inputSearchValue}&pmin=${
          changePrice[0]
        }&pmax=${changePrice[1]}&brands=${brandsChecked}&sale=${
          value.pageCategory === 'sale' ? 'Sale' : saleproducts
        }&category=${getCategoryValue}&pageCategory=${
          value.pageCategory === 'sale' ||
          value.pageCategory === 'clearance' ||
          value.pageCategory === 'new'
            ? 'all'
            : getPageCategoryValue
        }&subcat=${getSubCategoryValue}&size=${sizesChecked}&currentPage=${currentPage}&sorting=${sortValue}&clearance=${
          value.pageCategory === 'clearance' && true
        }&newproduct=${value.pageCategory === 'new' && true}`,
      );

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data = response.json();
      // dispatch(getAllSizes());

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// export const getAllSizes = createAsyncThunk(
//   'shoppingCart/getAllSizes',
//   async function (_, { rejectWithValue }) {
//     try {
//       const response = await fetch(`${process.env.API_URL}/api/sizes?populate[size]=true`);

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

const initialState = {
  mobile: false,
  allSizesFromApi: [],
  status: null,
  error: null,
  data: [],
  metaData: [],
  inputSearchValue: '',
  newSearch: true,
  pageCategory: [],
  pageCategoryChecked: [],
  sale: false,
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
    setMobile(state, action) {
      state.mobile = action.payload;
    },
    inputValue(state, action) {
      state.inputSearchValue = action.payload;
      state.newSearch = true;
    },
    setSale(state, action) {
      state.sale = !state.sale;
      updateSearchState(state);
    },
    setPageCategoryChecked(state, action) {
      state.pageCategoryChecked = toggleItemInArray(state.pageCategoryChecked, action.payload);
      updateSearchState(state);
    },

    setCategoryChecked(state, action) {
      state.categoryChecked = toggleItemInArray(state.categoryChecked, action.payload);
      updateSearchState(state);
    },

    setSubCategoryChecked(state, action) {
      state.subCategoryChecked = toggleItemInArray(state.subCategoryChecked, action.payload);
      updateSearchState(state);
    },

    setBrandsChecked(state, action) {
      state.brandsChecked = toggleItemInArray(state.brandsChecked, action.payload);
      updateSearchState(state);
    },
    setSizesChecked(state, action) {
      state.sizesChecked = action.payload;
      updateSearchState(state);
    },
    setSortValue(state, action) {
      state.sortValue = action.payload;
      updateSearchState(state);
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
      state.newSearch = false;
      state.searchFlag = !state.searchFlag;
    },
    setChangePrice(state, action) {
      if (
        state.changePrice[1] !== action.payload[1] ||
        state.changePrice[0] !== action.payload[0]
      ) {
        state.changePrice = action.payload;
      }
      updateSearchState(state);
    },
    clearAllFilters(state) {
      state.status = null;
      state.error = null;
      state.data = [];
      state.metaData = [];
      state.inputSearchValue = '';
      state.newSearch = true;
      state.pageCategory = [];
      state.pageCategoryChecked = [];
      state.sale = false;
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
      state.data = action.payload.data.attributes.sortedProducts;
      state.metaData = action.payload.meta;
      state.pageCategory = state.newSearch ? action.payload.meta.pageCategory : state.pageCategory;
      state.brands = state.newSearch ? action.payload.meta.brands : state.brands;
      state.category = state.newSearch ? action.payload.meta.category : state.category;
      state.subCategory = state.newSearch ? action.payload.meta.subCategory : state.subCategory;
      state.priceMinAndMax = state.newSearch
        ? [action.payload.meta.priceMin, action.payload.meta.priceMax]
        : state.priceMinAndMax;

      state.sizes = state.newSearch ? action.payload.meta.sizes : state.sizes;

      state.status = 'resolved';
    },
    [search.rejected]: setError,

    // [getAllSizes.fulfilled]: (state, action) => {
    //   state.allSizesFromApi = action.payload;
    //   const response = action.payload?.data[0]?.attributes.size;
    //   const sizesArr = response?.map((item) => {
    //     return item.size.toLowerCase();
    //   });
    //   state.allSizesFromApi = sizesArr;

    //   state.sizes = state.sizes.sort((a, b) => {
    //     return state.allSizesFromApi.indexOf(a) - state.allSizesFromApi.indexOf(b);
    //   });
    // },
    // [getAllSizes.rejected]: setError,
  },
});

export const {
  setMobile,
  inputValue,
  setBrandsChecked,
  setCategoryChecked,
  setPageCategoryChecked,
  setSubCategoryChecked,
  setSale,
  setSizesChecked,
  clearAllFilters,
  setChangePrice,
  setCurrentPage,
  setSortValue,
} = searchPageSlice.actions;

export default searchPageSlice.reducer;
