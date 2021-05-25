import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useWallet } from 'use-wallet';
import erc20ABI from 'config/abi/erc20.json';
import { getContract } from 'utils/web3';
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

export const useTotalSupply = () => {
  const { slowRefresh } = useRefresh();
  const [totalSupply, setTotalSupply] = useState<BigNumber>();

  useEffect(() => {
    async function fetchTotalSupply() {
      const yogiContract = getContract(erc20ABI, getAddress('yogi'));
      const supply = await yogiContract.methods.totalSupply().call();
      setTotalSupply(new BigNumber(supply));
    }

    fetchTotalSupply();
  }, [slowRefresh]);

  return totalSupply;
};

export const useBurnedBalance = (tokenAddress: string) => {
  const [balance, setBalance] = useState(new BigNumber(0));
  const { slowRefresh } = useRefresh();

  useEffect(() => {
    const fetchBalance = async () => {
      const yogiContract = getContract(erc20ABI, getAddress('yogi'));
      const bal = await yogiContract.methods.balanceOf('0x000000000000000000000000000000000000dEaD').call();
      setBalance(new BigNumber(bal));
    };

    fetchBalance();
  }, [tokenAddress, slowRefresh]);

  return balance;
};

export default useTokenBalance;
