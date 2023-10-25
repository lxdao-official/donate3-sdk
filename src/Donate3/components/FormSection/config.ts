import ethIcon from './../../images/coin/eth_icon.png';
import maticIcon from './../../images/coin/matic_icon.png';

import usdcIcon from './../../images/coin/usdc_icon.png';
import usdtIcon from './../../images/coin/usdt_icon.png';

export interface IToken {
  address: string;
  name: string;
  logo: string;
  selected?: boolean;
  symbol: string;
  abi?: string;
  isErc20?: boolean;
  decimals: number;
}

export const DEFAULT_COIN_ADDRESS =
  '0x0000000000000000000000000000000000000000';

export const defaultMainnet = {
  logo: ethIcon,
  name: 'ETH',
  symbol: 'ETH',
  address: DEFAULT_COIN_ADDRESS,
  selected: true,
  isErc20: false,
};

export const defaultOptimism = {
  logo: ethIcon,
  name: 'ETH',
  symbol: 'ETH',
  address: DEFAULT_COIN_ADDRESS,
  selected: true,
  isErc20: false,
};

export const defaultPolygon = {
  logo: maticIcon,
  name: 'Matic',
  symbol: 'MATIC',
  address: DEFAULT_COIN_ADDRESS,
  selected: true,
  isErc20: false,
};

export const defaultArbitrum = {
  logo: ethIcon,
  name: 'ETH',
  symbol: 'ETH',
  address: DEFAULT_COIN_ADDRESS,
  selected: true,
  isErc20: false,
};

const mainnetTokens = [
  {
    logo: usdcIcon,
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    selected: false,
    isErc20: true,
    decimals: 6,
  },
  {
    logo: usdtIcon,
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    selected: false,
    isErc20: true,
    decimals: 6,
  },
];

const optimismTokens = [
  // {
  //   logo: usdcIcon,
  //   name: 'USD Coin',
  //   symbol: 'USDC',
  //   address: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
  //   selected: false,
  //   isErc20: true,
  //   decimals: 6,
  // },
  {
    logo: usdcIcon,
    name: 'USD Coin (Bridged from Ethereum)',
    symbol: 'USDC.e',
    address: '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
    selected: false,
    isErc20: true,
    decimals: 6,
  },
  {
    logo: usdtIcon,
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    selected: false,
    isErc20: true,
    decimals: 6,
  },
];

const optimismGoerliTokens = [
  {
    logo: ethIcon,
    name: 'WETH',
    symbol: 'WETH',
    address: '0x4200000000000000000000000000000000000006',
    selected: false,
    isErc20: true,
    decimals: 18,
  },
];

const polygonTokens = [
  {
    logo: usdcIcon,
    name: 'USD Coin (PoS)',
    symbol: 'USDC',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    selected: false,
    isErc20: true,
    decimals: 6,
  },
  {
    logo: usdtIcon,
    name: '(PoS) Tether USD',
    symbol: 'USDT',
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    selected: false,
    isErc20: true,
    decimals: 6,
  },
];

const arbitrumTokens = [
  {
    logo: usdcIcon,
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    selected: false,
    isErc20: true,
    decimals: 6,
  },
  {
    logo: usdtIcon,
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    selected: false,
    isErc20: true,
    decimals: 6,
  },
];

const sepoliaTokens = [
  {
    logo: ethIcon,
    name: 'UNI',
    symbol: 'UNI',
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    selected: false,
    isErc20: true,
    decimals: 18,
  },
  {
    logo: ethIcon,
    name: 'WETH',
    symbol: 'WETH',
    address: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
    selected: false,
    isErc20: true,
    decimals: 18,
  },
];

const goerliTokens = [
  {
    logo: ethIcon,
    name: 'WETH',
    symbol: 'WETH',
    address: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    selected: false,
    isErc20: true,
    decimals: 18,
  },
];

const lineaTokens = [
  {
    logo: ethIcon,
    name: 'WETH',
    symbol: 'WETH',
    address: '0xe5D7C2a44FfDDf6b295A15c148167daaAf5Cf34f',
    selected: false,
    isErc20: true,
    decimals: 18,
  },
];

export const mainnetTokensInfo = [defaultMainnet, ...mainnetTokens];

export const optimismTokensInfo = [defaultOptimism, ...optimismTokens];

export const optimismGoerliTokensInfo = [
  defaultOptimism,
  ...optimismGoerliTokens,
];

export const polygonTokensInfo = [defaultPolygon];

export const arbitrumTokensInfo = [defaultArbitrum, ...arbitrumTokens];

export const sepoliaTokensInfo = [defaultMainnet, ...sepoliaTokens];

export const goerliTokensInfo = [defaultMainnet, ...goerliTokens];

export const lineaTokensInfo = [defaultMainnet, ...lineaTokens];

export const testNetTokensInfo = [defaultMainnet];
