import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  mrp: number;
  quantity: number;
  unit: string;
  storeId: string;
  storeName: string;
}

interface CartState {
  items: CartItem[];
  storeId: string | null;
  storeName: string | null;
  couponCode: string | null;
  discount: number;
  deliveryFee: number;
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  storeId: null,
  storeName: null,
  couponCode: null,
  discount: 0,
  deliveryFee: 25,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // Check if adding from different store
        if (state.storeId && state.storeId !== action.payload.storeId) {
          // Clear cart and add new item
          state.items = [{ ...action.payload, quantity: 1 }];
          state.storeId = action.payload.storeId;
          state.storeName = action.payload.storeName;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
          state.storeId = action.payload.storeId;
          state.storeName = action.payload.storeName;
        }
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      if (state.items.length === 0) {
        state.storeId = null;
        state.storeName = null;
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (item) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(
            (i) => i.productId !== action.payload.productId
          );
          if (state.items.length === 0) {
            state.storeId = null;
            state.storeName = null;
          }
        } else {
          item.quantity = action.payload.quantity;
        }
      }
    },
    applyCoupon: (
      state,
      action: PayloadAction<{ code: string; discount: number }>
    ) => {
      state.couponCode = action.payload.code;
      state.discount = action.payload.discount;
    },
    removeCoupon: (state) => {
      state.couponCode = null;
      state.discount = 0;
    },
    clearCart: (state) => {
      state.items = [];
      state.storeId = null;
      state.storeName = null;
      state.couponCode = null;
      state.discount = 0;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  applyCoupon,
  removeCoupon,
  clearCart,
  toggleCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCartTotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartItemCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartSavings = (state: { cart: CartState }) =>
  state.cart.items.reduce(
    (sum, item) => sum + (item.mrp - item.price) * item.quantity,
    0
  );

export default cartSlice.reducer;
