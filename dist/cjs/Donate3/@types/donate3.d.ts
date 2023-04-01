// @types.donate3.d.ts
export type Donate3ContextType = {
  donorList?: DonorResult;
  toAddress: `0x${string}` | undefined;
  fromAddress: `0x${string}` | undefined;
  type: number;
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
