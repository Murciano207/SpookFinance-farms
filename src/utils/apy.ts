import BigNumber from 'bignumber.js';

/**
 * Get farm APY value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param yogiPriceUsd Yogi price in USD
 * @param poolLiquidity Total pool liquidity in USD
 * @returns
 */
export const getFarmApy = (poolWeight: BigNumber, yogiPerBlock: BigNumber, yogiPrice: BigNumber, poolLiquidity: BigNumber): number => {
  const BLOCKS_PER_YEAR = parseInt(process.env.REACT_APP_BLOCKS_PER_YEAR);
  const yearlyRewards: BigNumber = yogiPerBlock.times(BLOCKS_PER_YEAR).times(poolWeight);
  const apy: BigNumber = yearlyRewards.times(yogiPrice).div(poolLiquidity).times(100);

  return apy.isNaN() || !apy.isFinite() ? null : apy.toNumber();
};

export default null;
