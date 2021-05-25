import addresses from 'config/constants/contracts';

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID);

export const getAddress = (name: string): string => {
  return addresses[name][chainId];
};
