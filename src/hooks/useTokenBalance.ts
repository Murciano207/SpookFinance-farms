import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useWallet } from 'use-wallet';
import erc20 from 'config/abi/erc20.json';
import multicall from 'utils/multicall';
import { getTokenBalance } from 'utils/erc20';
import { getAddress } from 'utils/addressHelpers';
import useRefresh from './useRefresh';

const useTokenBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const { account, ethereum } = useWallet();
  const { fastRefresh } = useRefresh();

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getTokenBalance(ethereum, tokenAddress, account);
      setBalance(new BigNumber(res));
    };

    if (account && ethereum) {
      fetchBalance();
    }
  }, [account, ethereum, tokenAddress, fastRefresh]);

  return balance;
};

export const useSupply = () => {
  const { slowRefresh } = useRefresh();
  const [supply, setSupply] = useState<BigNumber>(new BigNumber(0));
  const [burned, setBurned] = useState<BigNumber>(new BigNumber(0));
  const [totalSupply, setTotalSupply] = useState<BigNumber>(new BigNumber(0));

  useEffect(() => {
    async function fetchTotalSupply() {
      const yogiAddress = getAddress('yogi');

      const [s, cs, tl, v1, v2, v3, v4, v5, v6, b] = await multicall(erc20, [
        { address: yogiAddress, name: 'totalSupply' },
        { address: yogiAddress, name: 'balanceOf', params: [getAddress('crowdsale')] },
        { address: yogiAddress, name: 'balanceOf', params: [getAddress('timelock')] },
        { address: yogiAddress, name: 'balanceOf', params: [getAddress('vesting_1')] },
        { address: yogiAddress, name: 'balanceOf', params: [getAddress('vesting_2')] },
        { address: yogiAddress, name: 'balanceOf', params: [getAddress('vesting_3')] },
        { address: yogiAddress, name: 'balanceOf', params: [getAddress('vesting_4')] },
        { address: yogiAddress, name: 'balanceOf', params: [getAddress('vesting_5')] },
        { address: yogiAddress, name: 'balanceOf', params: [getAddress('vesting_6')] },
        { address: yogiAddress, name: 'balanceOf', params: [getAddress('dead')] },
      ]);

      setTotalSupply(new BigNumber(s));
      setSupply(new BigNumber(s).minus(cs).minus(b).minus(tl).minus(v1).minus(v2).minus(v3).minus(v4).minus(v5).minus(v6));
      setBurned(new BigNumber(b));
    }

    fetchTotalSupply();
  }, [slowRefresh]);

  return { supply, totalSupply, burned };
};

export default useTokenBalance;
