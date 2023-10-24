import { Chain } from '@rainbow-me/rainbowkit';

export const Linea: Chain = {
  id: 59_144,
  name: 'Linea',
  network: 'linea-mainnet',
  iconUrl: 'https://lineascan.build/images/svg/brands/main.svg',
  iconBackground: '#000',
  nativeCurrency: { name: 'Linea Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    infura: {
      http: ['https://linea-mainnet.infura.io/v3'],
      webSocket: ['wss://linea-mainnet.infura.io/ws/v3'],
    },
    default: {
      http: ['https://rpc.linea.build'],
      webSocket: ['wss://rpc.linea.build'],
    },
    public: {
      http: ['https://rpc.linea.build'],
      webSocket: ['wss://rpc.linea.build'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Etherscan',
      url: 'https://lineascan.build',
    },
    etherscan: {
      name: 'Etherscan',
      url: 'https://lineascan.build',
    }
  },
  contracts: {
    multicall3: {
      address: `0x${'cA11bde05977b3631167028862bE2a173976CA11'}`,
      blockCreated: 42,
    },
  },
  testnet: false,
};