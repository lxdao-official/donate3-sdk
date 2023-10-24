// @types.donate3.d.ts
import { embedType, floatType } from '../utils/const';
export interface Account {
  networkId: number,
  network?: string,
  address: `0x${string}` | undefined
}

export interface DonorItem {
  address: `0x${string}` | undefined;
  top: string;
  totaldonation: string;
  totalAmount:number;
}

export type Donate3ContextType = {
  donorList?: DonorItem[];
  toAddress: `0x${string}` | undefined;
  fromAddress: `0x${string}` | undefined;
  type: floatType | embedType;
  color?: string;
  total?: number;
  title?: string;
  showDonorList: boolean;
  setShowDonorList: React.Dispatch<React.SetStateAction<boolean>>;
  showSemiModal: boolean;
  setShowSemiModal: React.Dispatch<React.SetStateAction<boolean>>;
  isConnected: boolean;
  setShowLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showLoading: boolean;
  loadingDonorList: boolean;
  setLoadingDonorList: React.Dispatch<React.SetStateAction<boolean>>;
  demo: boolean;
  chain: (Chain & { unsupported?: boolean | undefined }) | undefined;
  chains: Chain[];
  avatar: `https://nftstorage.link/ipfs/${string}`;
};
export interface DonorRecord {
  chainType: string;
  coinType: number;
  createTime: string;
  fromAddress: string;
  hash: string;
  id: string;
  message: string;
  status: number;
  toAddress: string;
  updateTime: string;
  usdValue: number;
  userId: string;
  value: number;
}
export interface DonorResult {
  current: number;
  pages: number;
  records: DonorRecord[];
  size: number;
  total: number;
}
