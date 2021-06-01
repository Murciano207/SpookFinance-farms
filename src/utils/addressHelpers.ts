import addresses from 'config/constants/contracts';

const chainId = parseInt(process.env.REACT_APP_CHAIN_ID);

export const getAddress = (name: string): string => {
  let address = addresses[name];
  if (typeof address !== 'string') {
    address = address[chainId];
  }
  return address;
};
