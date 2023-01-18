import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cartState: false,
  // let Suppose Database with dummy items
  // cartItems: [],
  cartItems: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  //Let Suppose Database

  cartTotalAmount: 0,
  cartTotalQuantity: 0,
};

const CartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    setOpenCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    setCloseCart: (state, action) => {
      state.cartState = action.payload.cartState;
    },
    setAddItemToCart: (state, action) => {
      // Now we are working on filter for find index to get perfect single product.
      // Find Index
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.success(`Item QTY Increased`);
      } else {
        const temp = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(temp);
        toast.success(`${action.payload.title} added to Cart`);
      }
      // Get Previous action Data.
      // const temp = { ...action.payload, cartQuantity: 1 };
      // state.cartItems.push(temp);

      // Now we'll save data to Local-Storage.
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    // Mutable button  Logic
    setRemoveItemFromCart: (state, action) => {
      const removeItem = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.cartItems = removeItem;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
      toast.success(`${action.payload.title} Removed From Cart`);
    },

    // Increase - Decrease - ClearCartItem
    setIncreaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        toast.success(`Item QTY Increased`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setDecreaseItemQTY: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        toast.success(`Item QTY Decreased`);
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setClearCartItems: (state, action) => {
      state.cartItems = [];
      toast.success("Cart Cleared");
      // const itemIndex = state.cartItems.findIndex(
      //   (item) => item.id === action.payload.id
      // );
      // if (itemIndex >= 0) {
      //   state.cartItems[itemIndex].cartQuantity += 1;
      //   toast.success(`Item QTY Increased`);
      // }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    setGetTotals: (state, action) => {
      let { totalAmount, totalQTY } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const totalPrice = price * cartQuantity;

          cartTotal.totalAmount += totalPrice; // Confusing Point because don't return value of multiple Addition

          cartTotal.totalQTY += cartQuantity;

          return cartTotal;
        },
        {
          totalAmount: 0,
          totalQTY: 0,
        }
      );
      state.cartTotalAmount = totalAmount;
      state.cartTotalQuantity = totalQTY;
    },
  },
});

export const {
  setOpenCart,
  setCloseCart,
  setAddItemToCart,
  setRemoveItemFromCart,
  setIncreaseItemQTY,
  setDecreaseItemQTY,
  setClearCartItems,
  setGetTotals,
} = CartSlice.actions;
export const selectCartState = (state) => state.cart.cartState;
export const selectCartItems = (state) => state.cart.cartItems;
export const selectTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectTotalQTY = (state) => state.cart.cartTotalQuantity;

export default CartSlice.reducer;
