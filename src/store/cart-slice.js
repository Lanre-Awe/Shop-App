import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalAmount = action.payload.totalAmount;
      state.items = action.payload.items;
    },

    addToCartItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalAmount++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          quantity: 1,
          price: newItem.price,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity = existingItem.quantity + 1;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },

    removeFromCartitem(state, action) {
      const existingItems = state.items.find(
        (item) => item.id === action.payload.id
      );
      state.totalAmount--;
      state.changed = true;
      if (existingItems.quantity === 1) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        existingItems.quantity = existingItems.quantity - 1;
        existingItems.totalPrice =
          existingItems.totalPrice - existingItems.price;
      }
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.setNotification({
        status: "pending",
        title: "sending...",
        message: " sending cart data",
      })
    );
    const sentData = async () => {
      const response = await fetch(
        "https://react-http-684ce-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalAmount: cart.totalAmount,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
    };
    try {
      await sentData();
      dispatch(
        uiActions.setNotification({
          status: "success",
          title: "success",
          message: " sent cart data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error",
          message: "sending cart data failed!",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://react-http-684ce-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("....");
      }
      const data = await response.json();

      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartAction.replaceCart({
          items: cartData.items || [],
          totalAmount: cartData.totalAmount,
        })
      );
      console.log(cartData);
    } catch (error) {
      dispatch(
        uiActions.setNotification({
          status: "error",
          title: "Error",
          message: "fetching cart data failed!",
        })
      );
    }
  };
};
export const cartAction = cartSlice.actions;
export default cartSlice;
