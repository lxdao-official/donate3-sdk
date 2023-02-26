import "./polyfills";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "./index.css";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  // midnightTheme,
  lightTheme,
  Theme,
  DisclaimerComponent,
  AvatarComponent,
  // cssStringFromTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import App from "./App";
import {
  generateColorFromAddress,
  generateNounsImageFromAddress,
} from "./utils";

const base64Hash = generateNounsImageFromAddress(
  "0x17Fc7FBDf8Ab26bAaBFe5f8d0B5179593907F8E4"
);
console.log("---------", base64Hash);
const myCustomTheme: Theme = {
  blurs: {
    modalOverlay: "red",
  },
  colors: {
    accentColor: "red",
    accentColorForeground: "...",
    actionButtonBorder: "...",
    actionButtonBorderMobile: "...",
    actionButtonSecondaryBackground: "...",
    closeButton: "small",
    closeButtonBackground: "red",
    connectButtonBackground: "...",
    connectButtonBackgroundError: "...",
    connectButtonInnerBackground: "...",
    connectButtonText: "...",
    connectButtonTextError: "...",
    connectionIndicator: "...",
    downloadBottomCardBackground: "...",
    downloadTopCardBackground: "...",
    error: "...",
    generalBorder: "...",
    generalBorderDim: "...",
    menuItemBackground: "...",
    modalBackdrop: "white",
    modalBackground: "red",
    modalBorder: "...",
    modalText: "...",
    modalTextDim: "...",
    modalTextSecondary: "...",
    profileAction: "...",
    profileActionHover: "...",
    profileForeground: "...",
    selectedOptionBorder: "...",
    standby: "...",
  },
  fonts: {
    body: "...",
  },
  radii: {
    actionButton: "9999px",
    connectButton: "...",
    menuButton: "...",
    modal: "...",
    modalMobile: "...",
  },
  shadows: {
    connectButton: "...",
    dialog: "...",
    profileDetailsAction: "...",
    selectedOption: "...",
    selectedWallet: "...",
    walletLogo: "...",
  },
};

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    这里是 Donate3 的免责声明，待补充{" "}
    <Link href="https://termsofservice.xyz">Terms of Service</Link> and 这里是
    Donate3 的免责声明，待补充{" "}
    <Link href="https://disclaimer.xyz">Disclaimer</Link>
  </Text>
);

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  console.log(address, ensImage, size);
  const color = generateColorFromAddress(address);
  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      alt={"ENS img"}
      style={{ borderRadius: 999 }}
    />
  ) : (
    <div
      style={{
        backgroundColor: color,
        borderRadius: 999,
        height: size,
        width: size,
      }}
    >
      :^)
    </div>
  );
};

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    // polygon,
    // optimism,
    // arbitrum,
    ...(process.env.REACT_APP_ENABLE_TESTNETS === "true" ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit demo",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        appInfo={{
          appName: "Donate3",
          learnMoreUrl: "https://donate3.xyz",
          disclaimer: Disclaimer,
        }}
        avatar={CustomAvatar}
        // theme={myCustomTheme}
        // theme={midnightTheme({
        //   // accentColor: "#7b3fe4",
        //   // ...darkTheme.accentColors.green,
        //   // accentColorForeground: "white",
        //   // borderRadius: "small",
        //   // fontStack: "system",
        //   // overlayBlur: "small",
        // })}
        theme={{
          lightMode: lightTheme(),
          darkMode: darkTheme(),
        }}
        chains={chains}
        showRecentTransactions={true}
      >
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
