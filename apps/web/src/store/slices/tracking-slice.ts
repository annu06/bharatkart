import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type OrderTrackingStatus =
  | 'order_placed'
  | 'store_accepted'
  | 'picking'
  | 'packing'
  | 'packed'
  | 'rider_assigned'
  | 'rider_at_store'
  | 'picked_up'
  | 'on_the_way'
  | 'near_customer'
  | 'delivered';

interface RiderLocation {
  lat: number;
  lng: number;
  heading: number;
  speed: number;
  timestamp: number;
}

interface TrackingState {
  activeOrderId: string | null;
  status: OrderTrackingStatus | null;
  riderLocation: RiderLocation | null;
  eta: number | null; // minutes
  distanceRemaining: number | null; // meters
  riderInfo: {
    name: string;
    phone: string;
    photo: string;
    vehicleNumber: string;
    rating: number;
  } | null;
  route: Array<{ lat: number; lng: number }>;
  isLiveTracking: boolean;
}

const initialState: TrackingState = {
  activeOrderId: null,
  status: null,
  riderLocation: null,
  eta: null,
  distanceRemaining: null,
  riderInfo: null,
  route: [],
  isLiveTracking: false,
};

const trackingSlice = createSlice({
  name: 'tracking',
  initialState,
  reducers: {
    setActiveOrder: (state, action: PayloadAction<string>) => {
      state.activeOrderId = action.payload;
      state.isLiveTracking = true;
    },
    updateStatus: (state, action: PayloadAction<OrderTrackingStatus>) => {
      state.status = action.payload;
    },
    updateRiderLocation: (state, action: PayloadAction<RiderLocation>) => {
      state.riderLocation = action.payload;
    },
    updateEta: (
      state,
      action: PayloadAction<{ eta: number; distance: number }>
    ) => {
      state.eta = action.payload.eta;
      state.distanceRemaining = action.payload.distance;
    },
    setRiderInfo: (
      state,
      action: PayloadAction<TrackingState['riderInfo']>
    ) => {
      state.riderInfo = action.payload;
    },
    setRoute: (
      state,
      action: PayloadAction<Array<{ lat: number; lng: number }>>
    ) => {
      state.route = action.payload;
    },
    stopTracking: (state) => {
      state.isLiveTracking = false;
      state.activeOrderId = null;
      state.riderLocation = null;
      state.route = [];
    },
  },
});

export const {
  setActiveOrder,
  updateStatus,
  updateRiderLocation,
  updateEta,
  setRiderInfo,
  setRoute,
  stopTracking,
} = trackingSlice.actions;

export default trackingSlice.reducer;
