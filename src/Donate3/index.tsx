import { Global } from '@emotion/react';
import {
  DisclaimerComponent,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import React from 'react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import {
  sepolia,
  arbitrum,
  goerli,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  optimismGoerli
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import App from './App';
import { Linea } from './chains/linea';
import Donate3Provider from './context/Donate3Context';
import globalcss from './globalcss';
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { PetraWallet } from "petra-plugin-wallet-adapter";

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
  [mainnet, optimism, Linea, polygon, arbitrum, goerli, polygonMumbai, sepolia, optimismGoerli],
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

const wallets = [new PetraWallet()];

const Donate3 = (props: any) => {
  // console.log('--------------', props, { ...props.config });
  return (
    <React.StrictMode>
      <AptosWalletAdapterProvider 
      plugins={wallets}
      onError={(error)=>{
        console.log("Custom error handling", error);
      }}
      >
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
      </AptosWalletAdapterProvider>
    </React.StrictMode>
  );
};

export default React.memo(Donate3);
