import * as React from 'react';
import { Donate3ContextType, DonorResult } from '../@types/donate3';
import { useFetchDonors } from '../hooks/useDonate';
import DonorResultMockData from '../Mock/DonorResult.json';
import { DONATE_TYPE, ZERO_ADDRESS } from '../utils/const';
export const Donate3Context = React.createContext<Donate3ContextType>({
  toAddress: ZERO_ADDRESS,
  type: DONATE_TYPE.NORMAL,
  color: '#764abc',
  total: 0,
  title: 'Donate3',
});

const Donate3Provider: React.FC<{
  children: React.ReactNode;
  toAddress: string;
  type: number;
  color: string;
  title: string;
}> = ({
  children,
  toAddress,
  type = DONATE_TYPE.NORMAL,
  color = '#764abc',
  title = 'Donate3',
}) => {
  const [donorList, setDonorList] = React.useState<DonorResult>();
  const total = donorList?.result.records.length;
  const { donors: donorList2, loading } = useFetchDonors(toAddress, '1');
  console.log('--------donorlist', donorList2, loading);

  React.useEffect(() => {
    setDonorList(DonorResultMockData);
  }, []);

  return (
    <Donate3Context.Provider
      value={{ total, donorList, toAddress, title, type, color }}
    >
      {children}
    </Donate3Context.Provider>
  );
};

export default Donate3Provider;
