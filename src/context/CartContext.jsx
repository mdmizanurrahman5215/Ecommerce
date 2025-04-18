import { createContext, useEffect, useReducer } from "react";
import { useContext } from "react";
import { cartReducer } from "../reducer/CartReducer";

const CartContext = createContext();

const getCartData = () => {
  let localCartData = localStorage.getItem("cartData");

  if (
    localCartData === null ||
    localCartData === "null" ||
    localCartData === undefined ||
    localCartData.length === 0
  ) {
    return [];
  }

  try {
    return JSON.parse(localCartData);
  } catch (error) {
    console.error("Error parsing cartData from localStorage:", error);
    return [];
  }
};

const initialState = {
  cart: getCartData(),
  total_item: 0,
  total_amount: 0,
  shipping_fee: 50000,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };


  const setDecrease = (id) => {
    dispatch({ type: "SET_DECREMENT", payload: id });
  };
  const setIncrease = (id) => {
    dispatch({ type: "SET_INCREMENT", payload: id });
  };


  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  useEffect(() => {
    dispatch({type:"CART_TOTAL_ITEM"})
    dispatch({type:"CART_TOTAL_PRICE"})
    localStorage.setItem("cartData", JSON.stringify(state.cart));
  }, [state.cart]);
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setIncrease,
        setDecrease,
        // ...initialState,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
