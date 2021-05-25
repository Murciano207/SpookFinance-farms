import { useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import multicall from 'utils/multicall';
import { getAddress } from 'utils/addressHelpers';
import masterYogiABI from 'config/abi/masteryogi.json';
import getChainFarms from 'utils/getChainFarms';
import useRefresh from './useRefresh';

const useAllEarnings = () => {
  const [balances, setBalance] = useState([]);
  const { account }: { account: string } = useWallet();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const farms = getChainFarms();

    const fetchAllBalances = async () => {
      const calls = farms.map((farm) => ({
        address: getAddress('masteryogi'),
        name: 'pendingYogi',
        params: [farm.pid, account],
      }));

      const res = await multicall(masterYogiABI, calls);
      setBalance(res);
    };

    if (account) {
      fetchAllBalances();
    }
  }, [account, fastRefresh]);

  return balances;
};

export default useAllEarnings;
