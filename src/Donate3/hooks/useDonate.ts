import { useRequest } from 'ahooks';
import { useCallback } from 'react';
const BASE_URL = 'https://api.donate3.xyz';

// It seems like we can delete code here
interface Args {
  chainType: number;
  fromAddress: `0x${string}` | undefined;
  message: string;
  toAddress: `0x${string}` | undefined;
  value: string;
  usdValue: string;
  coinType?: number;
  hash?: `0x${string}` | undefined;
  id?: `0x${string}` | undefined;
  status?: number;
  createTime?: number;
  updateTime?: number;
  userId?: `0x${string}` | undefined;
}

export const useCreateDonate = () => {
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
    // console.log(':::', code, result);
    return result;
  }, []);

  return createDonate;
};

// unused
export const useFetchDonors = (
  toAddress: `0x${string}` | undefined,
  orderByType: string,
  chainType: string,
) => {
  const _fetchDonors = async () => {
    // console.log('-----_fetchDonors2');
    const res = await fetch(
      `${BASE_URL}/api/v1/donate/queryByParam?` +
        new URLSearchParams({
          toAddress: toAddress || '',
          orderByType,
          pageNo: '0',
          pageSize: '20',
          coinType: '0',
          chainType: chainType,
        }),
      {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const json = await res.json();

    const { result } = json;
    return result;
  };

  const { data: donors, loading } = useRequest(_fetchDonors);
  return { donors, loading };
};
