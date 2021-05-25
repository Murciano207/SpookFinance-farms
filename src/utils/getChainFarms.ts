import farmsConfig from 'config/constants/farms';

const getChainFarms = () => {
  const chainId = parseInt(process.env.REACT_APP_CHAIN_ID);
  const farms = farmsConfig.filter((f) => f.chain === chainId);
  return farms;
};

export default getChainFarms;
