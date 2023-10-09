import React, { useEffect, useState } from 'react';
import { Account, Donate3ContextType, DonorItem } from '../@types/donate3';
import { getFasterIpfsLink } from '../utils/ipfsTools';
import { useWallet } from '@solana/wallet-adapter-react';
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

    // const { chain, chains } = useNetwork();
    const { publicKey } = useWallet();
    const [nftData, setNftData] = useState<{
      name?: string,
      accountType?: number;
      address?: string;
      safeAccounts?: { networkId: number; address: string }[];
      avatar?: string;
      color: string;
      type: string;
    }>();

    // const { address: fromAddress, isConnected } = useAccount();
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
          toAddressReal = res.address
        })
        .catch((err) => {
          console.log(err);
        });
    }, [cid]);


    useEffect(() => {
      if (publicKey) {
        setShowSemiModal(false);
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
          toAddress: nftData?.address ?? toAddressReal,
          fromAddress: publicKey?.toBase58() ?? "11",
          title: nftData?.name ?? title,
          type:
            nftData?.type !== undefined ? (nftData?.type as DONATE_TYPE) : type,
          color: nftData?.color || color,
          showDonorList,
          setShowDonorList,
          showSemiModal,
          setShowSemiModal,
          isConnected: publicKey != null,
          showLoading,
          setShowLoading,
          loadingDonorList,
          setLoadingDonorList,
          demo,
          chain: "0",
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
