import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getFooterData = createAsyncThunk(
  'footerData/getFooterData',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${process.env.API_URL}/api/layout-footers`);

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
  data: false,
  status: null,
  error: null,
};

const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

export const footerDataSlice = createSlice({
  name: 'footerData',
  initialState,
  extraReducers: {
    [getFooterData.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [getFooterData.fulfilled]: (state, action) => {
      state.data = action.payload?.data[0]?.attributes;
      state.status = 'resolved';
    },

    [getFooterData.rejected]: setError,
  },
});

export default footerDataSlice.reducer;
