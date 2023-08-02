import * as React from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { Account, Donate3ContextType, DonorResult } from '../@types/donate3';

// import DonorResultMockData from '../Mock/DonorResult.json';
import {
  DONATE_TYPE,
  embedType,
  floatType,
  ZERO_ADDRESS,
} from '../utils/const';
export const Donate3Context = React.createContext<Donate3ContextType>({
  toAddress: ZERO_ADDRESS,
  fromAddress: ZERO_ADDRESS,
  type: DONATE_TYPE.EMBED,
  color: '#764abc',
  total: 0,
  title: 'Donate3',
  showDonorList: false,
  setShowDonorList: () => {},
  showSemiModal: false,
  setShowSemiModal: () => {},
  isConnected: false,
  showLoading: false,
  setShowLoading: () => {},
  loadingDonorList: true,
  setLoadingDonorList: () => {},
  demo: false,
  chain: '',
  chains: [],
  avatar: '',
});

const Donate3Provider: React.FC<{
  children: React.ReactNode;
  toAddress: `0x${string}` | undefined;
  safeAccounts?: Account[] | undefined;
  type: floatType | embedType;
  color: string;
  title: string;
  demo: boolean;
  avatar: string;
}> = ({
  children,
  toAddress,
  safeAccounts,
  type = DONATE_TYPE.EMBED,
  color = '#764abc',
  title = 'Donate3',
  demo = false,
  avatar,
}) => {
  const [showDonorList, setShowDonorList] = React.useState(false);
  const [showSemiModal, setShowSemiModal] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);
  const [loadingDonorList, setLoadingDonorList] = React.useState(true);
  const [donorList, setDonorList] = React.useState<DonorResult>();
  const { chain, chains } = useNetwork();

  const { address: fromAddress, isConnected } = useAccount();
  // const [donorList, setDonorList] = React.useState<DonorResult>();
  // const { donors: donorList } = useFetchDonors(
  //   toAddress,
  //   '1',
  //   chain?.id.toString() || '0',
  // );

  let toAddressReal = toAddress;
  React.useEffect(() => {
    (async () => {
      try {
        setLoadingDonorList(true);
        const res = await fetch(
          `https://api.donate3.xyz/api/v1/donate/queryByParam?` +
            new URLSearchParams({
              toAddress: toAddress || '',
              orderByType: '1',
              pageNo: '0',
              pageSize: '20',
              coinType: '0',
              chainType: chain?.id.toString() || '0',
            }),
          {
            method: 'GET',
            mode: 'cors', // no-cors, *cors, same-origin
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(res);
        const json = await res.json();
        console.log(json);

        const { result } = json;
        console.log(result);
        setDonorList(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingDonorList(false);
      }
    })();
  }, [chain, toAddressReal]);
  console.log(donorList);
  if (
    safeAccounts &&
    safeAccounts.length &&
    safeAccounts.some(
      (item: Account) =>
        item.network && item.address && item.network === chain?.network,
    )
  ) {
    toAddressReal = (
      safeAccounts.find(
        (item: Account) => item.network === chain?.network,
      ) as Account
    ).address;
  }

  const total = donorList?.records?.length;

  React.useEffect(() => {
    if (isConnected) {
      setShowSemiModal(false);
    } else {
      setShowSemiModal(true);
    }
    if (demo) {
      setShowSemiModal(false);
    }
  }, [isConnected]);

  return (
    <Donate3Context.Provider
      value={{
        total,
        donorList,
        toAddress: toAddressReal,
        fromAddress,
        title,
        type,
        color,
        showDonorList,
        setShowDonorList,
        showSemiModal,
        setShowSemiModal,
        isConnected,
        showLoading,
        setShowLoading,
        loadingDonorList,
        setLoadingDonorList,
        demo,
        chain,
        chains,
        avatar,
      }}
    >
      {children}
    </Donate3Context.Provider>
  );
};

export default Donate3Provider;
