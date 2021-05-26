import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PriceList, PriceState } from 'state/types';
import { fetchYogiPrice } from 'utils/gqlHelpers';

const initialState: PriceState = {
  isLoading: false,
  lastUpdated: null,
  data: null,
};

// Thunks
export const fetchPrices = createAsyncThunk<PriceList>('prices/fetch', async () => {
  let response = await fetch('https://mirror.yogi.fi/prices');
  const data = (await response.json()) as PriceList;

  response = await fetchYogiPrice();
  data['YOGI'] = Number(response['tokenPrices'][0]['price']);

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
