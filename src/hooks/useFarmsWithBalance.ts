import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useWallet } from 'use-wallet';
import multicall from 'utils/multicall';
import { getAddress } from 'utils/addressHelpers';
import masterYogiABI from 'config/abi/masteryogi.json';
import { farmsConfig } from 'config/constants';
import { FarmConfig } from 'config/constants/types';
import useRefresh from './useRefresh';

export interface FarmWithBalance extends FarmConfig {
  balance: BigNumber;
}

const useFarmsWithBalance = () => {
  const [farmsWithBalances, setFarmsWithBalances] = useState<FarmWithBalance[]>([]);
  const { account } = useWallet();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchBalances = async () => {
      const chainId = parseInt(process.env.REACT_APP_CHAIN_ID);
      const farms = farmsConfig.filter((f) => f.chain === chainId);

      const calls = farms.map((farm) => ({
        address: getAddress('masteryogi'),
        name: 'pendingYogi',
        params: [farm.pid, account],
      }));

      const rawResults = await multicall(masterYogiABI, calls);
      const results = farms.map((farm, index) => ({ ...farm, balance: new BigNumber(rawResults[index]) }));

      setFarmsWithBalances(results);
    };

    if (account) {
      fetchBalances();
    }
  }, [account, fastRefresh]);

  return farmsWithBalances;
};

export default useFarmsWithBalance;
