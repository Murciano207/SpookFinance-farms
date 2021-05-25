export const getFarmImage = (address: string) => {
  const chainId = process.env.REACT_APP_CHAIN_ID;
  return `https://raw.githubusercontent.com/yogi-fi/yogi-assets/master/farms/${chainId}/${address}.png`;
};
