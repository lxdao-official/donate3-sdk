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

// src/Donate3/components/SemiModal/SemiModal.tsx
var SemiModal_exports = {};
__export(SemiModal_exports, {
  default: () => SemiModal_default
});
module.exports = __toCommonJS(SemiModal_exports);
var import_rainbowkit = require("@rainbow-me/rainbowkit");
var import_bind = __toESM(require("classnames/bind"));
var import_react = __toESM(require("react"));
var import_Donate3Context = require("../../context/Donate3Context");
var import_loading = require("../../images/loading.svg");
var import_Footer = __toESM(require("../Footer/Footer"));
var import_UserAvatar = __toESM(require("../UserAvatar/UserAvatar"));
var import_SemiModal_module = __toESM(require("./SemiModal.module.css"));
function SemiModal() {
  let cx = import_bind.default.bind(import_SemiModal_module.default);
  const { openConnectModal } = (0, import_rainbowkit.useConnectModal)();
  const { showSemiModal, isConnected, setShowLoading, showLoading } = (0, import_react.useContext)(import_Donate3Context.Donate3Context);
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, showSemiModal ? /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: cx(
        import_SemiModal_module.default.semiModal,
        { in: !isConnected || showSemiModal },
        { out: isConnected || !showSemiModal }
      )
    },
    /* @__PURE__ */ import_react.default.createElement("div", { className: import_SemiModal_module.default.bgmask }),
    /* @__PURE__ */ import_react.default.createElement("div", { className: import_SemiModal_module.default.semiwrap }, /* @__PURE__ */ import_react.default.createElement("div", { className: import_SemiModal_module.default.semiimg }, /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        className: import_SemiModal_module.default.walleticon,
        src: "https://i.328888.xyz/2023/03/12/vkcMH.png"
      }
    ), /* @__PURE__ */ import_react.default.createElement(
      "img",
      {
        className: import_SemiModal_module.default.btcicon,
        src: "https://i.328888.xyz/2023/03/12/vkRxF.png"
      }
    )), /* @__PURE__ */ import_react.default.createElement(import_UserAvatar.default, null), /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: import_SemiModal_module.default.semidonatebtn,
        onClick: () => {
          setShowLoading(true);
          if (openConnectModal) {
            openConnectModal();
          }
        }
      },
      showLoading ? /* @__PURE__ */ import_react.default.createElement(import_loading.ReactComponent, null) : null,
      showLoading ? /* @__PURE__ */ import_react.default.createElement("span", null, "Confirm in wallet...") : /* @__PURE__ */ import_react.default.createElement("span", null, "Connect wallet for donation")
    ), /* @__PURE__ */ import_react.default.createElement(import_Footer.default, null))
  ) : null);
}
var SemiModal_default = import_react.default.memo(SemiModal);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
