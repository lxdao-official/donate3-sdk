import { Global } from '@emotion/react';
import {
  DisclaimerComponent,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import React from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli, polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import App from './App';
import Donate3Provider from './context/Donate3Context';
import globalcss from './globalcss';

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    这里是 Donate3 的免责声明，待补充{' '}
    <Link href="https://termsofservice.xyz">Terms of Service</Link> and 这里是
    Donate3 的免责声明，待补充{' '}
    <Link href="https://disclaimer.xyz">Disclaimer</Link>
  </Text>
);

const { chains, provider, webSocketProvider } = configureChains(
  // [mainnet, goerli, polygon, polygonMumbai],
  [polygon],
  // [polygonMumbai],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: 'Donate3',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const Donate3 = (props: any) => {
  // console.log('--------------', props, { ...props.config });
  return (
    <React.StrictMode>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider
          appInfo={{
            appName: 'Donate3',
            learnMoreUrl: 'https://donate3.xyz',
            disclaimer: Disclaimer,
          }}
          chains={chains}
          showRecentTransactions={true}
        >
          <Global styles={globalcss} />
          <Donate3Provider {...props.config} type={props.config.type}>
            <App />
          </Donate3Provider>
        </RainbowKitProvider>
      </WagmiConfig>
    </React.StrictMode>
  );
};

export default React.memo(Donate3);
