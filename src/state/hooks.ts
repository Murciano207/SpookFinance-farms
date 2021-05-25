import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useRefresh from 'hooks/useRefresh';
import { getWeb3NoAccount } from 'utils/web3';
import { fetchFarmsPublicDataAsync, setBlock } from './actions';
import { State, Farm, Block, PriceState } from './types';
import { fetchPrices } from './prices';

export const useFetchPublicData = () => {
  const dispatch = useDispatch();
  const { slowRefresh } = useRefresh();
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync());
  }, [dispatch, slowRefresh]);

  useEffect(() => {
    const web3 = getWeb3NoAccount();
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber();
      dispatch(setBlock(blockNumber));
    }, 6000);

    return () => clearInterval(interval);
  }, [dispatch]);
};

// Farms

export const useFarms = (): Farm[] => {
  const chainId = parseInt(process.env.REACT_APP_CHAIN_ID);
  const farms = useSelector((state: State) => state.farms.data.filter((f) => f.chain == chainId));
  return farms;
};

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid));
  return farm;
};

export const useFarmFromSymbol = (symbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.symbol === symbol));
  return farm;
};

export const useFarmFromAddress = (address: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.address === address));
  return farm;
};

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid);

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  };
};

// Prices

export const useTotalValue = (): number => {
  const [tvl, setTvl] = useState(0);
  const farms = useFarms();

  useEffect(() => {
    const newTvl: BigNumber = farms.reduce((acc, f) => {
      return acc.plus(f.liquidity);
    }, new BigNumber(0));

    setTvl(newTvl.toNumber());
  }, [farms]);

  return tvl;
};

// Prices
export const useFetchPriceList = () => {
  const { slowRefresh } = useRefresh();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPrices());
  }, [dispatch, slowRefresh]);
};

export const useGetApiPrices = () => {
  const prices: PriceState['data'] = useSelector((state: State) => state.prices.data);
  return prices;
};

export const useGetApiPrice = (token: string) => {
  const prices = useGetApiPrices();
  if (!prices) {
    return null;
  }
  return prices[token];
};

// Block
export const useBlock = (): Block => {
  return useSelector((state: State) => state.block);
};
