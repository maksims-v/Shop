import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getHeaderData = createAsyncThunk(
  'headerData/getHeaderData',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${process.env.API_URL}/api/layout-header`);

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

export const headerDataSlice = createSlice({
  name: 'headerData',
  initialState,
  reducers: {
    setHeaderData(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [getHeaderData.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [getHeaderData.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.data = action.payload?.data[0].attributes.linkList;
    },

    [getHeaderData.rejected]: setError,
  },
});

export default headerDataSlice.reducer;
