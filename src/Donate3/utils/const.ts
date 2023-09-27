export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export enum DONATE_TYPE {
  FLOAT = 'float',
  EMBED = 'embed',
}

export type floatType = typeof DONATE_TYPE.FLOAT;
export type embedType = typeof DONATE_TYPE.EMBED;

export type UFOType = {
  type: floatType | embedType;
};

export type PrimaryCoinType = {
  Mainnet: string | number[]; 
  Testnet: string | number[];
};

export const PRIMARY_COIN: PrimaryCoinType = {
  Mainnet: 'APT',
  Testnet: 'APT'
};

export const DONATE_VALUE_MAP: PrimaryCoinType = {
  Mainnet: [0.1, 1, 10],
  Testnet: [1, 10 , 20]
}

export type Explores = {
  [key: number]: string;
}
export const EXPLORER_URL_MAP: Explores = {
  0: 'https://etherscan.io/address/',
  1: 'https://etherscan.io/address/',
  2: 'https://etherscan.io/address/',
  56: 'https://bscscan.com/address/',
  137: 'https://polygonscan.com/address/',
  80001: 'https://mumbai.polygonscan.com/address/',
  5: 'https://goerli.etherscan.io/address/',
}