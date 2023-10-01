import React, { useEffect, useState } from 'react';
import { Account, Donate3ContextType, DonorItem } from '../@types/donate3';
import { getFasterIpfsLink } from '../utils/ipfsTools';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  DONATE_TYPE,
  embedType,
  floatType,
  MY_ADDRESS,
  ZERO_ADDRESS
} from '../utils/const';

export const Donate3Context = React.createContext<Donate3ContextType>({
  toAddress: ZERO_ADDRESS,
  fromAddress: MY_ADDRESS,
  type: DONATE_TYPE.EMBED,
  color: '#764abc',
  total: 0,
  title: 'Donate3',
  showDonorList: false,
  setShowDonorList: () => { },
  showSemiModal: false,
  setShowSemiModal: () => { },
  isConnected: false,
  showLoading: false,
  setShowLoading: () => { },
  loadingDonorList: true,
  setLoadingDonorList: () => { },
  demo: false,
  chain: '',
  chains: [],
  avatar: '',
});

const Donate3Provider: React.FC<{
  children: React.ReactNode;
  cid: string;
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
  cid,
  toAddress,
  color = '#764abc',
  title = 'Donate3',
  demo = false,
  avatar,
}) => {
    const { publicKey, } = useWallet();
    const [isConnected, setIsConnected] = useState(false);
    const [showDonorList, setShowDonorList] = React.useState(false);
    const [total, setTotal] = useState(0);
    const [showSemiModal, setShowSemiModal] = React.useState(false);
    const [showLoading, setShowLoading] = React.useState(false);
    const [loadingDonorList, setLoadingDonorList] = React.useState(true);
    const [donorList, setDonorList] = React.useState<DonorItem[]>();
    const [toAddressReal, setToAddressReal] = React.useState<string | undefined>(ZERO_ADDRESS);
    const [nftData, setNftData] = useState<{
      accountType?: number;
      address?: string;
      safeAccounts?: { networkId: number; address: string }[];
      avatar?: string;
      color: string;
      type: string;
    }>();

    let fromAddressReal = publicKey?.toBase58() || undefined;


    useEffect(() => {
      if (!cid) {
        return;
      }
      getFasterIpfsLink({
        ipfs: `https://nftstorage.link/ipfs/${cid}`,
        timeout: 4000,
      })
        .then((res: any) => {
          setNftData(res);
          setToAddressReal(res.address)
          console.log(res.address)
        })
    }, [cid]);

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
