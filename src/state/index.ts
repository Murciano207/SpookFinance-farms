import { configureStore } from '@reduxjs/toolkit';
import farmsReducer from './farms';
import pricesReducer from './prices';
import blockReducer from './block';

export default configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    farms: farmsReducer,
    prices: pricesReducer,
    block: blockReducer,
  },
});
