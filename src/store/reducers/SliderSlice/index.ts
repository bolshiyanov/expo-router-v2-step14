import { createSlice } from "@reduxjs/toolkit";

interface SliderInterface {
  isOpen: boolean;
}

const initialState: SliderInterface = {
  isOpen: false
};

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {
    sliderIsOpenAction(state) {
      state.isOpen = true;
    },
    sliderIsClosedAction(state) {
      state.isOpen = false;
    },
  },
});

export const { sliderIsOpenAction, sliderIsClosedAction } = sliderSlice.actions;

export default sliderSlice.reducer;