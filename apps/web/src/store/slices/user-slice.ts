import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Address {
  id: string;
  label: string;
  fullAddress: string;
  lat: number;
  lng: number;
  isDefault: boolean;
}

interface UserState {
  currentAddress: Address | null;
  addresses: Address[];
  isLocationDetecting: boolean;
}

const initialState: UserState = {
  currentAddress: null,
  addresses: [],
  isLocationDetecting: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentAddress: (state, action: PayloadAction<Address>) => {
      state.currentAddress = action.payload;
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = action.payload;
    },
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses.push(action.payload);
    },
    setLocationDetecting: (state, action: PayloadAction<boolean>) => {
      state.isLocationDetecting = action.payload;
    },
  },
});

export const {
  setCurrentAddress,
  setAddresses,
  addAddress,
  setLocationDetecting,
} = userSlice.actions;

export default userSlice.reducer;
