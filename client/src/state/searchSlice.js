import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchProduct: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchItem(state, actions) {
      state.searchProduct = actions.payload;
    },
  },
});

export const { searchItem } = searchSlice.actions;

export default searchSlice.reducer;
