import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PriceList, PriceState } from 'state/types';

const initialState: PriceState = {
  isLoading: false,
  lastUpdated: null,
  data: null,
};

// Thunks
export const fetchPrices = createAsyncThunk<PriceList>('prices/fetch', async () => {
  const response = await fetch('https://mirror.yogi.fi/prices');
  const data = (await response.json()) as PriceList;

  // FIXME: crowdsale price, fetch yogi price from the 80/20 pool
  data['YOGI'] = data[process.env.REACT_APP_CHAIN_NATIVE] * parseFloat(process.env.REACT_APP_CROWDSALE_RATIO);
  return data;
});

export const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPrices.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPrices.fulfilled, (state, action: PayloadAction<PriceList>) => {
      state.isLoading = false;
      state.lastUpdated = Date.now().toString();
      state.data = action.payload;
    });
  },
});

export default pricesSlice.reducer;
