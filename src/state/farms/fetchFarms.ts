import BigNumber from 'bignumber.js';
import erc20 from 'config/abi/erc20.json';
import masterYogiABI from 'config/abi/masteryogi.json';
import multicall from 'utils/multicall';
import { getAddress } from 'utils/addressHelpers';
import getChainFarms from 'utils/getChainFarms';
import { fetchFarmsLiquidity } from 'utils/gqlHelpers';

const fetchFarms = async () => {
  const farmsLiquidity = await fetchFarmsLiquidity();
  const farms = getChainFarms();

  const data = await Promise.all(
    farms.map(async (farm) => {
      const [tokenBalanceMC, lpTotalSupply] = await multicall(erc20, [
        // Balance of LP tokens in the master chef contract
        {
          address: farm.address,
          name: 'balanceOf',
          params: [getAddress('masteryogi')],
        },
        // Total supply of LP tokens
        {
          address: farm.address,
          name: 'totalSupply',
        },
      ]);

      const [info, totalAllocPoint, yogiPerBlock] = await multicall(masterYogiABI, [
        {
          address: getAddress('masteryogi'),
          name: 'poolInfo',
          params: [farm.pid],
        },
        {
          address: getAddress('masteryogi'),
          name: 'totalAllocPoint',
        },
        {
          address: getAddress('masteryogi'),
          name: 'yogiPerBlock',
        },
      ]);

      const unchecksum = farm.address.toLowerCase();
      const totalLiquidity = new BigNumber(farmsLiquidity.pools.find((p) => p.id === unchecksum).liquidity);
      const stakedRatio = new BigNumber(tokenBalanceMC).div(new BigNumber(lpTotalSupply));
      const allocPoint = new BigNumber(info.allocPoint._hex);
      const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint));

      return {
        ...farm,
        liquidity: totalLiquidity.times(stakedRatio).toNumber(),
        stakedRatio: stakedRatio.toNumber(),
        poolWeight: poolWeight.toNumber(),
        multiplier: allocPoint.div(100).toNumber(),
        yogiPerBlock: new BigNumber(yogiPerBlock).toNumber(),
      };
    }),
  );

  return data;
};

export default fetchFarms;
