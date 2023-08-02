// @types.donate3.d.ts
import { embedType, floatType } from '../utils/const';
export interface Account {
  network: string,
  address: `0x${string}` | undefined
}
export type Donate3ContextType = {
  donorList?: DonorResult;
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
