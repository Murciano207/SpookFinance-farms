export const compoundFactor = ({ days, apr }) => {
  const daily = apr / 365;
  const apy = Math.pow(daily / 100 + 1, days);
  return apy;
};

export const apyModalRoi = ({ compoundFactor, amountInvested }) => {
  return ((compoundFactor - 1) * 100).toFixed(2);
};
