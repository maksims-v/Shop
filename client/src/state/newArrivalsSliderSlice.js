import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getNewArrivalsSliderData = createAsyncThunk(
  'newArrivalsSlider/getNewArrivalsSliderData',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${process.env.API_URL}/api/products/newarrivals`);

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

export const newArrivalsSliderSlice = createSlice({
  name: 'newArrivalsSlider',
  initialState,
  extraReducers: {
    [getNewArrivalsSliderData.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [getNewArrivalsSliderData.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.data = action.payload.data.attributes.sortedProducts;
    },

    [getNewArrivalsSliderData.rejected]: setError,
  },
});

export default newArrivalsSliderSlice.reducer;
