import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    sliderData(state, actions) {
      state.items = actions.payload;
    },
  },
});

export const { sliderData } = sliderSlice.actions;

export default sliderSlice.reducer;
