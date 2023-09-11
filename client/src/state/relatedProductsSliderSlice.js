import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getRelatedProductsSliderData = createAsyncThunk(
  'relatedProductsSlider/getRelatedProductsSliderData',
  async function (query, { rejectWithValue }) {
    try {
      const response =
        query &&
        (await fetch(
          `${process.env.API_URL}/api/products/relatedproducts?pageCategory=${query.pageCategory}&category=${query.category}&subcat=${query.subcategory}&id=${query.id}`,
        ));

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
  data: [],
  status: null,
  error: null,
};

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

export const relatedProductsSliderSlice = createSlice({
  name: 'relatedProductsSlider',
  initialState,
  extraReducers: {
    [getRelatedProductsSliderData.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [getRelatedProductsSliderData.fulfilled]: (state, action) => {
      state.data = action.payload.data.attributes.sortedProducts;
      state.status = 'resolved';
    },

    [getRelatedProductsSliderData.rejected]: setError,
  },
});

export default relatedProductsSliderSlice.reducer;
