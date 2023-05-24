import * as React from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { Donate3ContextType } from '../@types/donate3';
import { useFetchDonors } from '../hooks/useDonate';
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
  demo: false,
  chain: '',
  chains: [],
});

const Donate3Provider: React.FC<{
  children: React.ReactNode;
  toAddress: `0x${string}` | undefined;
  type: floatType | embedType;
  color: string;
  title: string;
  demo: boolean;
}> = ({
  children,
  toAddress,
  type = DONATE_TYPE.EMBED,
  color = '#764abc',
  title = 'Donate3',
  demo = false,
}) => {
  const [showDonorList, setShowDonorList] = React.useState(false);
  const [showSemiModal, setShowSemiModal] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);
  const { chain, chains } = useNetwork();

  const { address: fromAddress, isConnected } = useAccount();
  // const [donorList, setDonorList] = React.useState<DonorResult>();
  const { donors: donorList } = useFetchDonors(toAddress, '1');
  const total = donorList?.records?.length;
  // console.log(
  //   '----------all context----------:',
  //   '\ntype:',
  //   type,
  //   '\ncolor:',
  //   color,
  //   '\nisConnected:',
  //   isConnected,
  //   '\nshowDonorList:',
  //   showDonorList,
  //   '\nshowLoading:',
  //   showLoading,
  //   '\ntoAddress:',
  //   toAddress,
  //   '\nfromAddress:',
  //   fromAddress,
  //   '\ndemo:',
  //   demo,
  // );

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
        toAddress,
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
        demo,
        chain,
        chains,
      }}
    >
      {children}
    </Donate3Context.Provider>
  );
};

export default Donate3Provider;
