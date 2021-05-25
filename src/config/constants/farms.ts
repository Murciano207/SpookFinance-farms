import { FarmConfig } from './types';

let farms: FarmConfig[];

if (process.env.REACT_APP_CHAIN_ID === '56') {
  farms = [
    {
      chain: 56,
      pid: 0,
      symbol: 'YOGI-BNB',
      address: '0x2c2f8b4a80ed44a85b6c2c77d984777a8b341e85',
    },
    {
      chain: 56,
      pid: 1,
      symbol: 'ETH-BNB',
      address: '0xc93aa16455c0d5f264b34a3873820f4030a8fcd2',
    },
    {
      chain: 56,
      pid: 2,
      symbol: 'BTC-BNB',
      address: '0x167274c165b7d6ba83bc218ae8883586a0888cff',
    },
    {
      chain: 56,
      pid: 3,
      symbol: 'BUSD-BNB',
      address: '0x346eb03b88a6ce562eaeb4f5123c2e5a5b6df067',
    },
    {
      chain: 56,
      pid: 4,
      symbol: 'BUSD-USDC-USDT',
      address: '0xee5aa5eeece66dbef71aaad59d7baaf560bf5f38',
    },
  ];
} else {
  farms = [
    {
      chain: 137,
      pid: 0,
      symbol: 'YOGI-MATIC',
      address: '0x964004c3b9821ac37ae73b13246d02e2e5984a3b',
    },
    {
      chain: 137,
      pid: 1,
      symbol: 'ETH-MATIC',
      address: '0x167274c165b7d6ba83bc218ae8883586a0888cff',
    },
    {
      chain: 137,
      pid: 2,
      symbol: 'BTC-MATIC',
      address: '0x346eb03b88a6ce562eaeb4f5123c2e5a5b6df067',
    },
    {
      chain: 137,
      pid: 3,
      symbol: 'USDC-MATIC',
      address: '0xc93aa16455c0d5f264b34a3873820f4030a8fcd2',
    },
    {
      chain: 137,
      pid: 4,
      symbol: 'USDC-USDT-DAI',
      address: '0x76e26357513296a3b459173dd013ee4c6006ea61',
    },
  ];
}

export default farms;
