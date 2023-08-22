const qs = require('qs');
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getProductData = createAsyncThunk(
  'productPage/getProductData',
  async function (value, { rejectWithValue }) {
    try {
      const slugQuery = qs.stringify({
        filters: { slug: value },
        populate: { image: true, size: true, color: true },
      });

      const response = await fetch(`${process.env.API_URL}/api/products?${slugQuery}`);

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

export const getSimilarProductData = createAsyncThunk(
  'productPage/getSimilarProductData',
  async function (value, { rejectWithValue }) {
    try {
      const query = qs.stringify({
        filters: {
          $and: [{ title: { $eqi: value.title } }, { slug: { $ne: value.slug } }],
        },
        populate: { image: true, size: true },
      });

      const response = await fetch(`${process.env.API_URL}/api/products?${query}`);

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
  productData: false,
  similarProductData: [],
  status: null,
  error: null,
};

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

export const productPageSlice = createSlice({
  name: 'productPage',
  initialState,
  extraReducers: {
    [getProductData.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [getProductData.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.productData = action.payload?.data[0]?.attributes;
    },

    [getProductData.rejected]: setError,

    [getSimilarProductData.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [getSimilarProductData.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.data = action.payload;
    },

    [getSimilarProductData.rejected]: setError,
  },
});

export default productPageSlice.reducer;
