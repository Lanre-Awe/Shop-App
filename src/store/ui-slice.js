import { createSlice } from "@reduxjs/toolkit";

const cartState = { cartIsShown: false, notification: null };
const uiSlice = createSlice({
  name: "ui",
  initialState: cartState,
  reducers: {
    toggle(state) {
      state.cartIsShown = !state.cartIsShown;
    },
    setNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice;
