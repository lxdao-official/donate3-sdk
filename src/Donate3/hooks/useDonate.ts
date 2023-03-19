import { useCallback } from 'react';
const BASE_URL = 'https://api.donate3.xyz';

interface Args {
  chainType: number;
  coinType: number;
  createTime: number;
  fromAddress: `0x${string}` | undefined;
  hash: `0x${string}` | undefined;
  id: `0x${string}` | undefined;
  message: string;
  status: number;
  toAddress: string;
  updateTime: number;
  usdValue: string;
  userId: `0x${string}` | undefined;
  value: string;
}

const useDonate = () => {
  const createDonate = useCallback(async (args: Args) => {
    console.log('inner', args);
    const res = await fetch(`${BASE_URL}/api/v1/donate/create`, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(args),
    });
    const json = await res.json();
    const { code, result } = json;
    console.log(':::', code, result);
    return result;
  }, []);
  return createDonate;
};

export default useDonate;
