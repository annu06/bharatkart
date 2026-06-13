import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cart-slice';
import userReducer from './slices/user-slice';
import trackingReducer from './slices/tracking-slice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    user: userReducer,
    tracking: trackingReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['tracking/updateRiderLocation'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
