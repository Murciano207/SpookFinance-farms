export const estimateCompound = ({ days, apr }) => {
  console.log('estimateCompound', days, apr);
  const daily = 0.01;
  return daily * days;
};

export const apyModalRoi = ({ compoundFactor, amountInvested }) => {
  return compoundFactor.toFixed(3);
};
