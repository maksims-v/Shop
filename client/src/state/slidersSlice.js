import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mainSliderData: [],
  newArrivalsData: [],
};

export const slidersSlice = createSlice({
  name: 'sliders',
  initialState,
  reducers: {
    mainSliderData(state, actions) {
      state.mainSliderData = actions.payload;
    },
    newArrivslsSliderData(state, actions) {
      state.newArrivalsData = actions.payload;
    },
  },
});

export const { mainSliderData, newArrivslsSliderData } = slidersSlice.actions;

export default slidersSlice.reducer;
