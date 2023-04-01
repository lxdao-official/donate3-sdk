import {
  DisclaimerComponent,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import React from 'react';
// import './global.css';
// import '@rainbow-me/rainbowkit/styles.css';
import { Global } from '@emotion/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import App from './App';
import Donate3Provider from './context/Donate3Context';
import globalcss from './globalcss';

// import { ReactComponent as Close2 } from './images/close.svg';

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    这里是 Donate3 的免责声明，待补充{' '}
    <Link href="https://termsofservice.xyz">Terms of Service</Link> and 这里是
    Donate3 的免责声明，待补充{' '}
    <Link href="https://disclaimer.xyz">Disclaimer</Link>
  </Text>
);

// const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
//   console.log(address, ensImage, size);

//   const base64Hash = useNouns('0x17Fc7FBDf8Ab26bAaBFe5f8d0B5179593907F8E4');

//   return ensImage ? (
//     <img
//       src={ensImage}
//       width={size}
//       height={size}
//       alt={'ENS img'}
//       style={{ borderRadius: 999 }}
//     />
//   ) : (
//     <img src={`data:image/svg+xml;base64,${base64Hash}`} />
//   );
// };

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
          // avatar={CustomAvatar}
          chains={chains}
          showRecentTransactions={true}
        >
          <Global styles={globalcss} />
          <Donate3Provider {...props.config} type={Number(props.config.type)}>
            <App />
          </Donate3Provider>
        </RainbowKitProvider>
      </WagmiConfig>
    </React.StrictMode>
  );
};

export default React.memo(Donate3);

{
  /* <React.StrictMode>
<WagmiConfig client={wagmiClient}>
  <RainbowKitProvider
    appInfo={{
      appName: 'Donate3',
      learnMoreUrl: 'https://donate3.xyz',
      disclaimer: Disclaimer,
    }}
    // avatar={CustomAvatar}
    chains={chains}
    showRecentTransactions={true}
  >
    <Global styles={globalcss} />
    <App {...props.config} />
  </RainbowKitProvider>
</WagmiConfig>
</React.StrictMode> */
}
