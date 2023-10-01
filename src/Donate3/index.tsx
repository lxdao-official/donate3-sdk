import { Global } from '@emotion/react';
import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';

import App from './App';
import Donate3Provider from './context/Donate3Context';
import globalcss from './globalcss';

const networks = [
  WalletAdapterNetwork.Devnet,
  WalletAdapterNetwork.Testnet,
  WalletAdapterNetwork.Mainnet
];

const Donate3 = (props: any) => {

  const endpoint = useMemo(() => clusterApiUrl(WalletAdapterNetwork.Devnet), networks);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], networks);

  return (
    <React.StrictMode>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets}>
          <Global styles={globalcss} />
          <Donate3Provider {...props.config} type={props.config.type}>
            <App />
          </Donate3Provider>
        </WalletProvider>
      </ConnectionProvider>
    </React.StrictMode >
  );
};

export default React.memo(Donate3);
