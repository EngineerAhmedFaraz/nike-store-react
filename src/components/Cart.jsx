import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectCartState,
  selectTotalAmount,
  selectTotalQTY,
  setClearCartItems,
  setCloseCart,
  setGetTotals,
} from "../app/CartSlice.js";
import CartCount from "./cart/CartCount";
import CartEmpty from "./cart/CartEmpty";
import CartItem from "./cart/CartItem";

const Cart = () => {
  // Use of useDispatch Method
  const dispatch = useDispatch();
  const ifCartState = useSelector(selectCartState);
  // Now work after LocalStorage
  const cartItems = useSelector(selectCartItems);
  // console.log(cartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const totalQTY = useSelector(selectTotalQTY);

  // Final Button Action
  useEffect(()=> {
    dispatch(setGetTotals)
  },[cartItems, dispatch])

  // One More Toggle Button
  const onCartToggle = () => {
    dispatch(
      setCloseCart({
        cartState: false,
      })
    );
  };
  //  Cart Logic for Increase and Decrease Button 
  const onClearCartItems = () => {
    dispatch(setClearCartItems())
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 blur-effect-theme w-full h-screen opacity-100 z-[250] ${
          ifCartState
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 invisible translate-x-8"
        }`}
      >
        <div
          className={`blur-effect-theme w-full max-w-xl h-screen absolute right-0`}
        >
          <CartCount totalQTY={totalQTY} onCartToggle={onCartToggle} onClearCartItems={onClearCartItems}  />
          {/* Items Show into different class with localStorage */}
          {cartItems.length === 0 ? (
            <CartEmpty onCartToggle={onCartToggle} />
          ) : (
            <div>
              <div className="flex flex-col justify-start items-start gap-y-7 lg:gap-y-5 overflow-y-scroll h-[81vh] scroll-smooth scroll-hidden py-3 ">
                {cartItems?.map((item, i) => (
                  <CartItem key={i} item={item} />
                ))}
              </div>
              {/* last Section of Cart Items */}
              <div className="fixed bottom-0 bg-white px-5 py-2 grid items-center">
                <div className="flex items-center justify-between">
                  <h1 className="text-base font-semibold uppercase">
                    SubTotal
                  </h1>
                  <h1 className="text-sm rounded bg-theme-cart text-slate-100 px-1 py-0.5">
                    {totalAmount}
                  </h1>
                </div>
                <div className="text-sm font-medium text-center ">
                  <p>Taxes and Shipping will Calculate At Shipping</p>
                  <button
                    type="button"
                    className="button-theme bg-theme-cart text-white"
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* <CartEmpty />
          <CartItem /> */}
        </div>
      </div>
    </>
  );
};

export default Cart;
