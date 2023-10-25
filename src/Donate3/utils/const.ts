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
  Ethereum: string | number[];
  Goerli: string | number[];
  Polygon: string | number[];
  'Polygon Mumbai': string | number[];
};

export const PRIMARY_COIN: PrimaryCoinType = {
  Ethereum: 'ETH',
  Goerli: 'ETH',
  Polygon: 'MATIC',
  'Polygon Mumbai': 'MATIC',
};

export const DONATE_VALUE_MAP: PrimaryCoinType = {
  Ethereum: [0.001, 0.01, 0.5],
  Goerli: [0.001, 0.01, 0.5],
  Polygon: [0.5, 5, 25],
  'Polygon Mumbai': [0.5, 5, 25],
};

export type Explores = {
  [key: number]: string;
};
export const EXPLORER_URL_MAP: Explores = {
  0: 'https://etherscan.io/address/',
  1: 'https://etherscan.io/address/',
  56: 'https://bscscan.com/address/',
  137: 'https://polygonscan.com/address/',
  80001: 'https://mumbai.polygonscan.com/address/',
  5: 'https://goerli.etherscan.io/address/',
};

interface Coin {
  name: string;
  icon: string;
  explorer: string;
  eas: string;
}
interface CoinList {
  [key: number]: Coin;
}
interface Chain {
  name: string;
  icon: string;
  coin: CoinList;
}
interface ChainList {
  [key: string]: Chain;
}

export const coinType: ChainList = {
  '80001': {
    name: 'Polygon Mumbai',
    icon: '/icons/support/polygon.svg',
    coin: {
      0: {
        name: 'MATIC',
        icon: '/icons/support/polygon.svg',
        explorer: 'https://mumbai.polygonscan.com/tx/',
        eas: 'https://optimism-goerli-bedrock.easscan.org/',
      },
    },
  },
  '137': {
    name: 'Polygon',
    icon: '/icons/support/polygon.svg',
    coin: {
      0: {
        name: 'MATIC',
        icon: '/icons/support/polygon.svg',
        explorer: 'https://polygonscan.com/tx/',
        eas: 'https://optimism-goerli-bedrock.easscan.org/',
      },
    },
  },
  '5': {
    name: 'ETH Goerli',
    icon: '/icons/support/ethereum.svg',
    coin: {
      0: {
        name: 'MATIC',
        icon: '/icons/support/ethereum.svg',
        explorer: 'https://goerli.etherscan.io/tx/',
        eas: 'https://optimism-goerli-bedrock.easscan.org/',
      },
    },
  },
  '1': {
    name: 'Ethereum',
    icon: '/icons/support/ethereum.svg',
    coin: {
      0: {
        name: 'ETH',
        icon: '/icons/support/ethereum.svg',
        explorer: 'https://etherscan.io/tx/',
        eas: 'https://optimism-goerli-bedrock.easscan.org/',
      },
    },
  },
  '10': {
    name: 'Optimism',
    icon: '/icons/support/ethereum.svg',
    coin: {
      0: {
        name: 'ETH',
        icon: '/icons/support/ethereum.svg',
        explorer: 'https://optimistic.etherscan.io/tx/',
        eas: 'https://optimism-goerli-bedrock.easscan.org/',
      },
    },
  },
  '42161': {
    name: 'Arbitrum',
    icon: '/icons/support/ethereum.svg',
    coin: {
      0: {
        name: 'ETH',
        icon: '/icons/support/arbitrum.svg',
        explorer: 'https://arbiscan.io/tx/',
        eas: 'https://optimism-goerli-bedrock.easscan.org/',
      },
    },
  },
  '59144': {
    name: 'Linea',
    icon: '/icons/support/linea.svg',
    coin: {
      0: {
        name: 'ETH',
        icon: '/icons/support/ethereum.svg',
        explorer: 'https://lineascan.build/tx/',
        eas: 'https://optimism-goerli-bedrock.easscan.org/',
      },
    },
  },
  '11155111': {
    name: 'Sepolia',
    icon: '/icons/support/ethereum.svg',
    coin: {
      0: {
        name: 'MATIC',
        icon: '/icons/support/ethereum.svg',
        explorer: 'https://sepolia.etherscan.io/tx/',
        eas: 'https://sepolia.easscan.org/',
      },
    },
  },
  '420': {
    name: 'Optimistic Goerli',
    icon: '/icons/support/optimism.svg',
    coin: {
      0: {
        name: 'Optimistic Goerli',
        icon: '/icons/support/ethereum.svg',
        explorer: 'https://goerli-optimism.etherscan.io/tx/',
        eas: 'https://optimism-goerli-bedrock.easscan.org/',
      },
    },
  },
};
