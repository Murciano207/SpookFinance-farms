export interface Token {
  symbol: string;
  address: string;
  decimals?: number;
  projectLink?: string;
}

export interface FarmConfig {
  chain: number;
  pid: number;
  symbol: string;
  address: string;
}
