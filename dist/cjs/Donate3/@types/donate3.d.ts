// @types.donate3.d.ts
export type Donate3ContextType = {
  donorList?: DonorResult;
  toAddress: string;
  type: number;
  color?: string;
  total?: number;
  title?: string;
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
  code: string;
  message: string;
  result: {
    current: number;
    pages: number;
    records: DonorRecord[];
    size: number;
    total: number;
  };
  success: boolean;
  timestamp: number;
}
