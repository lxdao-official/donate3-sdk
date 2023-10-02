import arbIcon from './../../images/coin/arb_icon.png';
import ethIcon from './../../images/coin/eth_icon.png';
import maticIcon from './../../images/coin/matic_icon.png';
import opIcon from './../../images/coin/op_icon.png';

import usdcIcon from './../../images/coin/usdc_icon.png';
import usdtIcon from './../../images/coin/usdt_icon.png';

import MainNetUsdcAbi from './../../utils/abi/mainnet/usdc.json';
import MainNetUsdtAbi from './../../utils/abi/mainnet/usdt.json';

import optimisticUsdcAbi from './../../utils/abi/optimistic/usdc.json';
import optimisticUsdtAbi from './../../utils/abi/optimistic/usdt.json';

import polygonUsdcAbi from './../../utils/abi/polygon/usdc.json';
import polygonUsdtAbi from './../../utils/abi/polygon/usdt.json';

import arbitrumUsdcAbi from './../../utils/abi/arbitrum/usdc.json';
import arbitrumUsdtAbi from './../../utils/abi/arbitrum/usdt.json';

import sepoliaUniAbi from './../../utils/abi/sepolia/uni.json';


export interface IToken {
  address: string;
  name: string;
  logo: string;
  selected?: boolean;
  symbol: string;
  abi: string;
}

export const DEFAULT_COIN_ADDRESS =
  '0x0000000000000000000000000000000000000000';
export const WETH_COIN_ADDRESS = '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984';

export const defaultMainnet = {
  logo: ethIcon,
  name: 'ETH',
  symbol: 'ETH',
  address: WETH_COIN_ADDRESS,
  selected: true,
  abi: sepoliaUniAbi,
};

export const defaultOptimism = {
  logo: opIcon,
  name: 'Optimism',
  symbol: 'OP',
  address: DEFAULT_COIN_ADDRESS,
  selected: true,
  abi: '',
};

export const defaultPolygon = {
  logo: maticIcon,
  name: 'Matic',
  symbol: 'MATIC',
  address: DEFAULT_COIN_ADDRESS,
  selected: true,
  abi: '',
};

export const defaultArbitrum = {
  logo: arbIcon,
  name: 'Arbitrum',
  symbol: 'ARB',
  address: DEFAULT_COIN_ADDRESS,
  selected: true,
  abi: '',
};

const mainnetTokens = [
  {
    logo: usdcIcon,
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    selected: false,
    abi: MainNetUsdcAbi,
  },
  {
    logo: usdtIcon,
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    selected: false,
    abi: MainNetUsdtAbi,
  },
];

const optimismTokens = [
  {
    logo: usdcIcon,
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
    selected: false,
    abi: optimisticUsdcAbi,
  },
  {
    logo: usdtIcon,
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0x94b008aA00579c1307B0EF2c499aD98a8ce58e58',
    selected: false,
    abi: optimisticUsdtAbi,
  },
];

const polygonTokens = [
  {
    logo: usdcIcon,
    name: 'USD Coin (PoS)',
    symbol: 'USDC',
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    selected: false,
    abi: polygonUsdcAbi,
  },
  {
    logo: usdtIcon,
    name: '(PoS) Tether USD',
    symbol: 'USDT',
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    selected: false,
    abi: polygonUsdtAbi,
  },
];

const arbitrumTokens = [
  {
    logo: usdcIcon,
    name: 'USD Coin',
    symbol: 'USDC',
    address: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    selected: false,
    abi: arbitrumUsdcAbi,
  },
  {
    logo: usdtIcon,
    name: 'Tether USD',
    symbol: 'USDT',
    address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    selected: false,
    abi: arbitrumUsdtAbi,
  },
];

export const mainnetTokensInfo = [defaultMainnet, ...mainnetTokens];

export const optimismTokensInfo = [defaultOptimism, ...optimismTokens];

export const polygonTokensInfo = [defaultPolygon, ...polygonTokens];

export const arbitrumTokensInfo = [defaultArbitrum, ...arbitrumTokens];

export const testNetTokensInfo = [defaultMainnet];
