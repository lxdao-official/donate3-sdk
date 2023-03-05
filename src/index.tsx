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
import { mainnet, goerli, polygon, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import App from "./App";
import useNouns from "./hooks/useNouns";
import { Props } from "./App";

declare global {
  interface Window {
    renderDonate3: any;
  }
}

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

  const base64Hash = useNouns("0x17Fc7FBDf8Ab26bAaBFe5f8d0B5179593907F8E4");
  console.log("---------", base64Hash);

  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      alt={"ENS img"}
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

const renderDonate3 = (domElement: HTMLElement | null, config: Props) => {
  if (!domElement) throw new Error("Your DOM id is incorrect");

  const root = ReactDOM.createRoot(domElement as HTMLElement);
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
          <App {...config} />
        </RainbowKitProvider>
      </WagmiConfig>
    </React.StrictMode>
  );
};

window.renderDonate3 = renderDonate3;

renderDonate3(document.getElementById("donate3_root"), {
  type: 1,
  color: "#396AFF",
  name: "Charity3",
  address: "0xb86EB6f8a39Db243a9ae544F180ef958dBA4e8b4",
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
