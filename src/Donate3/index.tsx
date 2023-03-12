import React from 'react';
import './index.css';

import {
  AvatarComponent,
  DisclaimerComponent,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import useNouns from './hooks/useNouns';
import { ReactComponent as Avatar } from './images/avatar.svg';
import Close1, { ReactComponent as Close2 } from './images/close.svg';
// import { ReactComponent as Close2 } from './images/close.svg';
import ufo from './images/ufo.jpg';

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
  [
    mainnet,
    goerli,
    polygon,
    polygonMumbai,
    ...(process.env.REACT_APP_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
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
  console.log('ufo', ufo);
  console.log('Close1', Close1);
  console.log('Close2', Close2);
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
          {/* <App {...props.config} /> */}1<img src={ufo}></img>2
          <img src="https://i.328888.xyz/2023/03/12/vDbWC.jpeg"></img>3
          {/* <Close1></Close1>4 */}4
          <div style={{ backgroundColor: 'red' }}>
            <Close2 fill="red"></Close2>
          </div>
          <div style={{ backgroundColor: 'red' }}>
            avatar1<Avatar></Avatar>
          </div>
          <div style={{ backgroundColor: 'red' }}>
            avatar2<Avatar></Avatar>
          </div>
          <div style={{ backgroundColor: 'red' }}>
            avatar3<Avatar></Avatar>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </React.StrictMode>
  );
};

export default Donate3;
