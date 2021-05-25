import BigNumber from 'bignumber.js';
import erc20ABI from 'config/abi/erc20.json';
import masterYogiABI from 'config/abi/masteryogi.json';
import multicall from 'utils/multicall';
import getChainFarms from 'utils/getChainFarms';
import { getAddress } from 'utils/addressHelpers';

export const fetchFarmUserAllowances = async (account: string) => {
  const masterYogiAdress = getAddress('masteryogi');
  const farms = getChainFarms();

  const calls = farms.map((farm) => {
    return { address: farm.address, name: 'allowance', params: [account, masterYogiAdress] };
  });

  const rawLpAllowances = await multicall(erc20ABI, calls);
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON();
  });

  return parsedLpAllowances;
};

export const fetchFarmUserTokenBalances = async (account: string) => {
  const farms = getChainFarms();

  const calls = farms.map((farm) => {
    return {
      address: farm.address,
      name: 'balanceOf',
      params: [account],
    };
  });

  const rawTokenBalances = await multicall(erc20ABI, calls);
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON();
  });
  return parsedTokenBalances;
};

export const fetchFarmUserStakedBalances = async (account: string) => {
  const masterYogiAdress = getAddress('masteryogi');
  const farms = getChainFarms();

  const calls = farms.map((farm) => {
    return {
      address: masterYogiAdress,
      name: 'userInfo',
      params: [farm.pid, account],
    };
  });

  const rawStakedBalances = await multicall(masterYogiABI, calls);
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON();
  });
  return parsedStakedBalances;
};

export const fetchFarmUserEarnings = async (account: string) => {
  const farms = getChainFarms();

  const masterYogiAddress = getAddress('masteryogi');

  const calls = farms.map((farm) => {
    return {
      address: masterYogiAddress,
      name: 'pendingYogi',
      params: [farm.pid, account],
    };
  });

  const rawEarnings = await multicall(masterYogiABI, calls);

  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON();
  });

  return parsedEarnings;
};
