import React, { useEffect, useState } from 'react';
import { Account, Donate3ContextType, DonorItem } from '../@types/donate3';
import { getFasterIpfsLink } from '../utils/ipfsTools';

// import DonorResultMockData from '../Mock/DonorResult.json';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
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
  cid: string;
  accountType: number;
  toAddress: `0x${string}` | undefined;
  safeAccounts?: Account[] | undefined;
  type: floatType | embedType;
  color: string;
  title: string;
  demo: boolean;
  avatar: string;
}> = ({
  children,
  cid,
  accountType,
  toAddress,
  safeAccounts,
  type = DONATE_TYPE.EMBED,
  color = '#764abc',
  title = 'Donate3',
  demo = false,
  avatar,
}) => {
  const [showDonorList, setShowDonorList] = React.useState(false);
  const [total, setTotal] = useState(0);
  const [showSemiModal, setShowSemiModal] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);
  const [loadingDonorList, setLoadingDonorList] = React.useState(true);
  const [donorList, setDonorList] = React.useState<DonorItem[]>();
  const [fromAddress, setFromAddress] = React.useState('');
  const [isConnected, setIsConnected] = React.useState(false);
  const { network, account, connected } = useWallet();
  const [nftData, setNftData] = useState<{
    accountType?: number;
    address?: string;
    safeAccounts?: { networkId: number; address: string }[];
    avatar?: string;
    color: string;
    type: string;
  }>();
  useEffect(() => {
    setFromAddress(account?.address ?? '');
  }, [account]);
  useEffect(() => {
    setIsConnected(connected);
  }, [connected]);

  // const [donorList, setDonorList] = React.useState<DonorResult>();
  // const { donors: donorList } = useFetchDonors(
  //   toAddress,
  //   '1',
  //   chain?.id.toString() || '0',
  // );
  let toAddressReal =
    accountType === 0 || accountType === undefined ? toAddress : undefined;

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
        let accountTypeNft = res.accountType;
        toAddressReal =
          accountTypeNft === 0 || accountTypeNft === undefined
            ? res.address
            : undefined;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [cid]);

  useEffect(() => {
    if (!toAddressReal) {
      setDonorList([]);
      return;
    }

    // (async () => {
    //   try {
    //     setLoadingDonorList(true);
    //     const res = await fetch(
    //       `https://backend.donate3.xyz/donates/ranking?` +
    //         // `https://donate3.0xhardman.xyz/donates/ranking?` +
    //         new URLSearchParams({
    //           address: toAddressReal || '',
    //           chainId: chain?.id.toString() || '0',
    //         }),
    //       {
    //         method: 'GET',
    //         mode: 'cors', // no-cors, *cors, same-origin
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       },
    //     );

    //     const json = await res.json();
    //     console.log(json);

    //     const { data: result } = json;
    //     console.log(result);
    //     setDonorList(result?.length ? result : []);
    //   } catch (error) {
    //     setDonorList([]);
    //     console.log(error);
    //   } finally {
    //     setLoadingDonorList(false);
    //   }
    // })();
  }, [/*chain,*/ toAddressReal]);
  console.log(donorList);
  if (
    accountType === 1 &&
    safeAccounts &&
    safeAccounts.length &&
    safeAccounts.some(
      (item: Account) =>
        item.networkId &&
        item.address &&
        item.networkId === parseInt(network?.chainId ?? '1'),
    )
  ) {
    toAddressReal = (
      safeAccounts.find(
        (item: Account) => item.networkId === parseInt(network?.chainId ?? '1'),
      ) as Account
    ).address;
  }

  useEffect(() => {
    let count = (donorList && donorList.length) || 0;
    setTotal(count);
  }, [donorList]);

  useEffect(() => {
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
        type:
          nftData?.type !== undefined ? (nftData?.type as DONATE_TYPE) : type,
        color: nftData?.color || color,
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
        chain: network,
        chains: [],
        avatar: (nftData?.avatar ||
          avatar) as `https://nftstorage.link/ipfs/${string}`,
      }}
    >
      {children}
    </Donate3Context.Provider>
  );
};

export default Donate3Provider;
