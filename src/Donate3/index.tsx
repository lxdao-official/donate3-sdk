import { Global } from '@emotion/react';
import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

import App from './App';
import Donate3Provider from './context/Donate3Context';
import globalcss from './globalcss';

const Donate3 = (props: any) => {
  // console.log('--------------', props, { ...props.config });
const network = WalletAdapterNetwork.Devnet;
const endpoint = useMemo(() => clusterApiUrl(network), [network]);
const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);
  

const Donate3 = (props: any) => {
  // console.log('--------------', props, { ...props.config });
  return (
    <React.StrictMode>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <Global styles={globalcss} />
          <Donate3Provider {...props.config} type={props.config.type}>
            <App />
          </Donate3Provider>
          </WalletProvider>
      </ConnectionProvider>
    </React.StrictMode>
  );
};

export default React.memo(Donate3);
