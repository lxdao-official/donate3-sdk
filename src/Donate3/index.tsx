import { Global } from '@emotion/react';
import { JoyIdWallet } from '@joyid/rainbowkit';
import {
  connectorsForWallets,
  DisclaimerComponent,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import React from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  arbitrum,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  sepolia,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import App from './App';
import { Linea } from './chains/linea';
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

const { chains, publicClient } = configureChains(
  // [mainnet, goerli, polygon, polygonMumbai],
  [mainnet, optimism, Linea, polygon, arbitrum, polygonMumbai, sepolia, optimismGoerli],
  // [polygonMumbai],
  [publicProvider()],
);
const wallet = getDefaultWallets({
  appName: 'Donate3',
  projectId: '1f449d25c01a7ece08ce2ffeeaaac6c8',
  chains,
}).connectors();

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    ...wallet,
    ...connectorsForWallets([
      {
        groupName: 'Recommended',
        wallets: [
          JoyIdWallet({
            chains,
            options: {
              name: 'Donate3',
              logo: 'https://www.donate3.xyz/logo-big.png',
              joyidAppURL: 'https://app.joy.id',
            },
          }),
        ],
      },
    ])(),
  ],
  publicClient,
});

const Donate3 = (props: any) => {
  // console.log('--------------', props, { ...props.config });
  return (
    <React.StrictMode>
      <WagmiConfig config={wagmiConfig}>
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
