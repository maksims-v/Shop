import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getSectionBannerData = createAsyncThunk(
  'bannerData/getSectionBannerData',
  async function (_, { rejectWithValue }) {
    console.log('hai');
    try {
      const response = await fetch(`${process.env.API_URL}/api/section-banners`);

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
  category: '/',
  subcategory: false,
  image: false,
  status: null,
  error: null,
};

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

export const sectionBannerSlice = createSlice({
  name: 'bannerData',
  initialState,
  extraReducers: {
    [getSectionBannerData.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [getSectionBannerData.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.category = action.payload.data[0].attributes?.category;
      state.subcategory = action.payload.data[0].attributes?.subcategory
        ? action.payload.data[0].attributes?.subcategory
        : false;

      state.image = action.payload.data[0].attributes.image.data?.attributes.url;
    },

    [getSectionBannerData.rejected]: setError,
  },
});

export default sectionBannerSlice.reducer;
