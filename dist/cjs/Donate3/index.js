var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Donate3/index.tsx
var Donate3_exports = {};
__export(Donate3_exports, {
  default: () => Donate3_default
});
module.exports = __toCommonJS(Donate3_exports);
var import_rainbowkit = require("@rainbow-me/rainbowkit");
var import_react = __toESM(require("react"));
var import_global = require("./global.css");
var import_wagmi = require("wagmi");
var import_chains = require("wagmi/chains");
var import_public = require("wagmi/providers/public");
var import_App = __toESM(require("./App"));
var import_useNouns = __toESM(require("./hooks/useNouns"));
var Disclaimer = ({ Text, Link }) => /* @__PURE__ */ import_react.default.createElement(Text, null, "这里是 Donate3 的免责声明，待补充", " ", /* @__PURE__ */ import_react.default.createElement(Link, { href: "https://termsofservice.xyz" }, "Terms of Service"), " and 这里是 Donate3 的免责声明，待补充", " ", /* @__PURE__ */ import_react.default.createElement(Link, { href: "https://disclaimer.xyz" }, "Disclaimer"));
var CustomAvatar = ({ address, ensImage, size }) => {
  console.log(address, ensImage, size);
  const base64Hash = (0, import_useNouns.default)("0x17Fc7FBDf8Ab26bAaBFe5f8d0B5179593907F8E4");
  return ensImage ? /* @__PURE__ */ import_react.default.createElement(
    "img",
    {
      src: ensImage,
      width: size,
      height: size,
      alt: "ENS img",
      style: { borderRadius: 999 }
    }
  ) : /* @__PURE__ */ import_react.default.createElement("img", { src: `data:image/svg+xml;base64,${base64Hash}` });
};
var { chains, provider, webSocketProvider } = (0, import_wagmi.configureChains)(
  [import_chains.mainnet, import_chains.goerli, import_chains.polygon, import_chains.polygonMumbai],
  [(0, import_public.publicProvider)()]
);
var { connectors } = (0, import_rainbowkit.getDefaultWallets)({
  appName: "RainbowKit demo",
  chains
});
var wagmiClient = (0, import_wagmi.createClient)({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider
});
var App3 = () => {
  const { openConnectModal } = (0, import_rainbowkit.useConnectModal)();
  return /* @__PURE__ */ import_react.default.createElement("button", { type: "button", onClick: openConnectModal }, "open");
};
var Donate3 = (props) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.StrictMode, null, /* @__PURE__ */ import_react.default.createElement(import_wagmi.WagmiConfig, { client: wagmiClient }, /* @__PURE__ */ import_react.default.createElement(
    import_rainbowkit.RainbowKitProvider,
    {
      appInfo: {
        appName: "Donate3",
        learnMoreUrl: "https://donate3.xyz",
        disclaimer: Disclaimer
      },
      avatar: CustomAvatar,
      chains,
      showRecentTransactions: true
    },
    /* @__PURE__ */ import_react.default.createElement(import_App.default, { ...props.config }),
    /* @__PURE__ */ import_react.default.createElement(App3, null),
    /* @__PURE__ */ import_react.default.createElement(import_rainbowkit.ConnectButton, null)
  )));
};
var Donate3_default = Donate3;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
