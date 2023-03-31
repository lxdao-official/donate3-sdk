import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import React from 'react';
// import './global.css';
// import '@rainbow-me/rainbowkit/styles.css';
import { Global } from '@emotion/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { goerli, mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import App from "./App";
import Donate3Provider from "./context/Donate3Context";
import globalcss from "./globalcss";

// import { ReactComponent as Close2 } from './images/close.svg';

var Disclaimer = function Disclaimer(_ref) {
  var Text = _ref.Text,
    Link = _ref.Link;
  return /*#__PURE__*/React.createElement(Text, null, "\u8FD9\u91CC\u662F Donate3 \u7684\u514D\u8D23\u58F0\u660E\uFF0C\u5F85\u8865\u5145", ' ', /*#__PURE__*/React.createElement(Link, {
    href: "https://termsofservice.xyz"
  }, "Terms of Service"), " and \u8FD9\u91CC\u662F Donate3 \u7684\u514D\u8D23\u58F0\u660E\uFF0C\u5F85\u8865\u5145", ' ', /*#__PURE__*/React.createElement(Link, {
    href: "https://disclaimer.xyz"
  }, "Disclaimer"));
};

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

var _configureChains = configureChains([mainnet, goerli, polygon, polygonMumbai], [publicProvider()]),
  chains = _configureChains.chains,
  provider = _configureChains.provider,
  webSocketProvider = _configureChains.webSocketProvider;
var _getDefaultWallets = getDefaultWallets({
    appName: 'RainbowKit demo',
    chains: chains
  }),
  connectors = _getDefaultWallets.connectors;
var wagmiClient = createClient({
  autoConnect: true,
  connectors: connectors,
  provider: provider,
  webSocketProvider: webSocketProvider
});
var Donate3 = function Donate3(props) {
  console.log('-----Donate3');
  return /*#__PURE__*/React.createElement(React.StrictMode, null, /*#__PURE__*/React.createElement(WagmiConfig, {
    client: wagmiClient
  }, /*#__PURE__*/React.createElement(RainbowKitProvider, {
    appInfo: {
      appName: 'Donate3',
      learnMoreUrl: 'https://donate3.xyz',
      disclaimer: Disclaimer
    }
    // avatar={CustomAvatar}
    ,
    chains: chains,
    showRecentTransactions: true
  }, /*#__PURE__*/React.createElement(Global, {
    styles: globalcss
  }), /*#__PURE__*/React.createElement(Donate3Provider, props.config, /*#__PURE__*/React.createElement(App, null)))));
};
export default /*#__PURE__*/React.memo(Donate3);
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