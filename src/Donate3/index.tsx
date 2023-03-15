import React from 'react';
import './index.css';
import './rainbow.css';

import {
  AvatarComponent,
  ConnectButton,
  DisclaimerComponent,
  getDefaultWallets,
  RainbowKitProvider,
  useConnectModal,
} from '@rainbow-me/rainbowkit';
// import '@rainbow-me/rainbowkit/styles.css';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import App from './App';
import useNouns from './hooks/useNouns';
// import { ReactComponent as Close2 } from './images/close.svg';

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    这里是 Donate3 的免责声明，待补充{' '}
    <Link href="https://termsofservice.xyz">Terms of Service</Link> and 这里是
    Donate3 的免责声明，待补充{' '}
    <Link href="https://disclaimer.xyz">Disclaimer</Link>
  </Text>
);

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  console.log(address, ensImage, size);

  const base64Hash = useNouns('0x17Fc7FBDf8Ab26bAaBFe5f8d0B5179593907F8E4');

  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      alt={'ENS img'}
      style={{ borderRadius: 999 }}
    />
  ) : (
    <img src={`data:image/svg+xml;base64,${base64Hash}`} />
  );
};

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, polygon, polygonMumbai],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit demo',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const App3 = () => {
  const { openConnectModal } = useConnectModal();
  return (
    <button type="button" onClick={openConnectModal}>
      open
    </button>
  );
};

const Donate3 = (props: any) => {
  return (
    <React.StrictMode>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          appInfo={{
            appName: 'Donate3',
            learnMoreUrl: 'https://donate3.xyz',
            disclaimer: Disclaimer,
          }}
          avatar={CustomAvatar}
          chains={chains}
          showRecentTransactions={true}
        >
          <App {...props.config} />
          <App3></App3>
          <ConnectButton></ConnectButton>
        </RainbowKitProvider>
      </WagmiConfig>
    </React.StrictMode>
  );
};

export default Donate3;
