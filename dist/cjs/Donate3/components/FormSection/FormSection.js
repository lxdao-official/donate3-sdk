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

// src/Donate3/components/FormSection/FormSection.tsx
var FormSection_exports = {};
__export(FormSection_exports, {
  default: () => FormSection_default
});
module.exports = __toCommonJS(FormSection_exports);
var import_rainbowkit = require("@rainbow-me/rainbowkit");
var import_ethers = require("ethers");
var import_react = __toESM(require("react"));
var import_wagmi = require("wagmi");
var import_abi = __toESM(require("../../abi.json"));
var import_Donate3Context = require("../../context/Donate3Context");
var import_useDonate = require("../../hooks/useDonate");
var import_eth = require("../../images/eth.svg");
var import_loading = require("../../images/loading.svg");
var import_switch = require("../../images/switch.svg");
var import_Success = __toESM(require("../Success/Success"));
var import_FormSection_module = __toESM(require("./FormSection.module.css"));
function FormSection() {
  const { openChainModal } = (0, import_rainbowkit.useChainModal)();
  const { chain } = (0, import_wagmi.useNetwork)();
  const [amount, setAmount] = (0, import_react.useState)(0);
  const [message, setMessage] = (0, import_react.useState)("");
  const [donateCreateSuccess, setDonateCreateSuccess] = (0, import_react.useState)(false);
  const createDonate = (0, import_useDonate.useCreateDonate)();
  const {
    toAddress,
    fromAddress,
    setShowSemiModal,
    isConnected,
    setShowLoading,
    showLoading,
    color
  } = import_react.default.useContext(import_Donate3Context.Donate3Context);
  const timeout = 5;
  let pid = 3;
  const amountIn = amount && import_ethers.ethers.utils.parseEther(amount.toString());
  const bytesMsg = import_ethers.ethers.utils.toUtf8Bytes(message);
  let donateTokenArgs = [
    pid,
    amountIn,
    toAddress,
    // '0xb86EB6f8a39Db243a9ae544F180ef958dBA4e8b4',
    bytesMsg,
    [],
    {
      value: amountIn
    }
  ];
  console.log("合约参数:", donateTokenArgs);
  const { config } = (0, import_wagmi.usePrepareContractWrite)({
    address: "0xbdEA24f8657eC8AD679b8bCcc761EcEE9600667e",
    abi: import_abi.default,
    functionName: "donateToken",
    args: donateTokenArgs
  });
  const {
    data: transactionData,
    isSuccess,
    isError,
    write
  } = (0, import_wagmi.useContractWrite)(config);
  (0, import_react.useEffect)(() => {
    if (isConnected) {
      setShowSemiModal(false);
      setShowLoading(false);
    } else {
      setShowSemiModal(true);
    }
  }, [isConnected]);
  (0, import_react.useEffect)(() => {
    if (donateCreateSuccess) {
      setTimeout(() => {
        setDonateCreateSuccess(false);
      }, timeout * 1e3);
    }
  }, [donateCreateSuccess]);
  const asyncFunc = async () => {
    const createDonateArgs = {
      chainType: 4,
      coinType: 0,
      //TODO, 这里我应该传什么？有哪些值？
      fromAddress,
      userId: fromAddress,
      hash: transactionData == null ? void 0 : transactionData.hash,
      // 这里我取 transaction hash
      // id: transactionData?.hash, // 这里的 id 我也暂时取了 hash，因为 hash 是唯一的
      message,
      // status: 0, // TODO 这里的状态有哪些值？
      toAddress,
      usdValue: String(amount),
      // 这里是否可以支持 int 和 string 两种类型？
      value: String(amount)
      // 这里是否可以支持 int 和 string 两种类型？
    };
    const result = await createDonate(createDonateArgs);
    setDonateCreateSuccess(true);
    console.log(result);
  };
  (0, import_react.useEffect)(() => {
    if (isSuccess) {
      setShowLoading(false);
      asyncFunc();
    }
    if (isError) {
      setShowLoading(false);
    }
  }, [isSuccess, isError]);
  const handleDonate = async () => {
    if (isConnected) {
      setShowSemiModal(false);
      setShowLoading(true);
      write == null ? void 0 : write();
      console.log(transactionData);
    } else {
      setShowSemiModal(true);
    }
  };
  const handleEthAmount = (event) => {
    var _a, _b;
    event.currentTarget.querySelectorAll("div").forEach((item) => {
      item.classList.remove(import_FormSection_module.default.active);
    });
    const amount2 = ((_b = (_a = event.target) == null ? void 0 : _a.dataset) == null ? void 0 : _b.amount) || 0;
    event.target.classList.add(import_FormSection_module.default.active);
    setAmount(amount2);
  };
  const handleManualAmount = (event) => {
    setAmount(Number(event.target.value));
  };
  return /* @__PURE__ */ import_react.default.createElement("section", { className: import_FormSection_module.default.appcontent }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", { className: import_FormSection_module.default.title }, "Payment Method"), /* @__PURE__ */ import_react.default.createElement("div", { className: import_FormSection_module.default.methodinput }, /* @__PURE__ */ import_react.default.createElement("div", { className: import_FormSection_module.default.cointxt }, /* @__PURE__ */ import_react.default.createElement(import_eth.ReactComponent, null), /* @__PURE__ */ import_react.default.createElement("span", null, "ETH"), /* @__PURE__ */ import_react.default.createElement("span", null, "Ethereum")), /* @__PURE__ */ import_react.default.createElement("div", { className: import_FormSection_module.default.switch, onClick: openChainModal }, /* @__PURE__ */ import_react.default.createElement(import_switch.ReactComponent, null))), /* @__PURE__ */ import_react.default.createElement("div", { className: import_FormSection_module.default.footermark }, /* @__PURE__ */ import_react.default.createElement("div", null, "icon"), /* @__PURE__ */ import_react.default.createElement("div", null, "21.11ETH"), /* @__PURE__ */ import_react.default.createElement("div", null, "0.01E = $127; 31GWEI = $0.75"))), /* @__PURE__ */ import_react.default.createElement("div", { className: import_FormSection_module.default.shortcutoption, onClick: handleEthAmount }, /* @__PURE__ */ import_react.default.createElement("div", { "data-amount": 1e-3 }, "0.001 ETH"), /* @__PURE__ */ import_react.default.createElement("div", { "data-amount": 0.01 }, "0.01 ETH"), /* @__PURE__ */ import_react.default.createElement("div", { "data-amount": 0.5 }, "0.5 ETH")), /* @__PURE__ */ import_react.default.createElement("fieldset", { className: import_FormSection_module.default.fieldset }, /* @__PURE__ */ import_react.default.createElement("legend", null, /* @__PURE__ */ import_react.default.createElement("span", null, "OR"))), /* @__PURE__ */ import_react.default.createElement(
    "input",
    {
      className: import_FormSection_module.default.pricebtn,
      placeholder: "Enter Price Manually",
      value: amount,
      onChange: handleManualAmount
    }
  ), /* @__PURE__ */ import_react.default.createElement("div", { className: import_FormSection_module.default.msg }, /* @__PURE__ */ import_react.default.createElement("div", null, "Message"), /* @__PURE__ */ import_react.default.createElement(
    "textarea",
    {
      placeholder: "Will be published on chain",
      value: message,
      onChange: (e) => {
        setMessage(e.currentTarget.value);
      }
    }
  )), /* @__PURE__ */ import_react.default.createElement(
    "button",
    {
      type: "button",
      className: import_FormSection_module.default.donate3btn,
      style: { background: color },
      disabled: !write,
      onClick: handleDonate
    },
    showLoading ? /* @__PURE__ */ import_react.default.createElement(import_loading.ReactComponent, null) : null,
    showLoading ? /* @__PURE__ */ import_react.default.createElement("div", null, "Confirm in wallet...") : /* @__PURE__ */ import_react.default.createElement("div", null, "DONATE3")
  ), donateCreateSuccess ? /* @__PURE__ */ import_react.default.createElement(
    import_Success.default,
    {
      timeout,
      setDonateCreateSuccess
    }
  ) : null);
}
var FormSection_default = import_react.default.memo(FormSection);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
