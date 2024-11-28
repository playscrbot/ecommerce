import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = {
  cartItems: [],
  cartCount: 0,
  wishlist: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        cartCount: state.cartCount + 1,
      };
    case 'REMOVE_FROM_CART':
      const updatedCartItems = state.cartItems.filter(item => item.id !== action.payload);
      return {
        ...state,
        cartItems: updatedCartItems,
        cartCount: state.cartCount - 1,
      };
    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload],
      };
    case 'REMOVE_FROM_WISHLIST':
      const updatedWishlist = state.wishlist.filter(item => item.id !== action.payload);
      return {
        ...state,
        wishlist: updatedWishlist,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const addToWishlist = (item) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: item });
  };

  const removeFromWishlist = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: itemId });
  };

  return <CartContext.Provider value={{ cart: state.cartItems, cartCount: state.cartCount, addToCart, removeFromCart, addToWishlist, removeFromWishlist }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  return useContext(CartContext);
};