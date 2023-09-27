import React, { useEffect, useState } from 'react';
import { Account, Donate3ContextType, DonorItem } from '../@types/donate3';
// import { getFasterIpfsLink } from '../utils/ipfsTools';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  DONATE_TYPE,
  embedType,
  floatType,
  ZERO_ADDRESS
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
  // cid: string;
  accountType: number;
  toAddress: `${string}` | undefined;
  safeAccounts?: Account[] | undefined;
  type: floatType | embedType;
  color: string;
  title: string;
  demo: boolean;
  avatar: string;
}> = ({
  children,
  accountType,
  toAddress,
  title = 'Donate3',
  demo = false,
}) => {
  const { publicKey } = useWallet();

  const [isConnected, setIsConnected] = useState(false);
  const [showDonorList, setShowDonorList] = React.useState(false);
  const [total, setTotal] = useState(0);
  const [showSemiModal, setShowSemiModal] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);
  const [loadingDonorList, setLoadingDonorList] = React.useState(true);
  const [donorList, setDonorList] = React.useState<DonorItem[]>();
  // const { chain, chains } = useNetwork();
  // const { address: fromAddress, isConnected } = useAccount();
  // const [nftData, setNftData] = useState<{
  //   accountType?: number;
  //   address?: string;
  //   safeAccounts?: { networkId: number; address: string }[];
  //   avatar?: string;
  //   color: string;
  //   type: string;
  // }>();

  let fromAddressReal = publicKey?.toBase58() || undefined;
  let toAddressReal =
    accountType === 0 || accountType === undefined ? toAddress : undefined;
  

  useEffect(() => {
    if (!toAddressReal) {
      setDonorList([]);
      return;
    }

    (async () => {
      try {
        setLoadingDonorList(true);
        const res = await fetch(
          `https://backend.donate3.xyz/donates/ranking?` +
            // `https://donate3.0xhardman.xyz/donates/ranking?` +
            new URLSearchParams({
              address: toAddressReal || '',
              chainId: '0',
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
        console.log(json);

        const { data: result } = json;
        console.log(result);
        setDonorList(result?.length ? result : []);
      } catch (error) {
        setDonorList([]);
        console.log(error);
      } finally {
        setLoadingDonorList(false);
      }
    })();
  }, [toAddressReal]);

  useEffect(() => {
    let count = (donorList && donorList.length) || 0;
    setTotal(count);
  }, [donorList]);

  useEffect(() => {
    if (publicKey) {
      setShowSemiModal(false);
      setIsConnected(true);
      fromAddressReal = publicKey.toBase58()
    } else {
      setShowSemiModal(true);
    }
    if (demo) {
      setShowSemiModal(false);
    }
  }, [publicKey]);

  return (
    <Donate3Context.Provider
      value={{
        total,
        donorList,
        toAddress: toAddressReal,
        fromAddress: fromAddressReal,
        title,
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
      }}
    >
      {children}
    </Donate3Context.Provider>
  );
};

export default Donate3Provider;
