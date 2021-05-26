import random from 'lodash/random';

const chainId: number = parseInt(process.env.REACT_APP_CHAIN_ID) || 137;

const nodes = {
  // BSC: https://docs.binance.org/smart-chain/developer/rpc.html
  56: [
    'https://bsc-dataseed.binance.org/',
    'https://bsc-dataseed1.defibit.io/',
    'https://bsc-dataseed1.ninicoin.io/',
    'https://bsc-dataseed2.defibit.io/',
    'https://bsc-dataseed3.defibit.io/',
    'https://bsc-dataseed4.defibit.io/',
    'https://bsc-dataseed2.ninicoin.io/',
    'https://bsc-dataseed3.ninicoin.io/',
    'https://bsc-dataseed4.ninicoin.io/',
    'https://bsc-dataseed1.binance.org/',
    'https://bsc-dataseed2.binance.org/',
    'https://bsc-dataseed3.binance.org/',
    'https://bsc-dataseed4.binance.org/',
  ],

  // Polygon: https://docs.matic.network/docs/develop/network-details/network
  137: [
    'https://rpc-mainnet.matic.network',
    'https://rpc-mainnet.maticvigil.com',
    'https://rpc-mainnet.matic.quiknode.pro',
    'https://matic-mainnet.chainstacklabs.com',
    'https://matic-mainnet-full-rpc.bwarelabs.com',
    'https://matic-mainnet-archive-rpc.bwarelabs.com',
  ],
};

const getNodeUrl = () => {
  const randomIndex = random(0, nodes[chainId].length - 1);
  return nodes[chainId][randomIndex];
};

export default getNodeUrl;
