import BigNumber from 'bignumber.js';
import { FarmConfig } from 'config/constants/types';

export interface Farm extends FarmConfig {
  liquidity?: BigNumber;
  stakedRatio?: BigNumber;
  poolWeight?: BigNumber;
  multiplier?: BigNumber;
  yogiPerBlock?: BigNumber;
  userData?: {
    allowance: BigNumber;
    tokenBalance: BigNumber;
    stakedBalance: BigNumber;
    earnings: BigNumber;
  };
}

// Slices states

export interface FarmsState {
  data: Farm[];
}

// API Price State
export interface PriceList {
  [key: string]: number;
}

export interface PriceState {
  isLoading: boolean;
  lastUpdated: string;
  data: PriceList;
}

// Global state

export interface State {
  farms: FarmsState;
  prices: PriceState;
  block: Block;
}

export interface Block {
  blockNumber: number;
}
