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

// src/Donate3/context/Donate3Context.tsx
var Donate3Context_exports = {};
__export(Donate3Context_exports, {
  Donate3Context: () => Donate3Context,
  default: () => Donate3Context_default
});
module.exports = __toCommonJS(Donate3Context_exports);
var React = __toESM(require("react"));
var import_useDonate = require("../hooks/useDonate");
var import_DonorResult = __toESM(require("../Mock/DonorResult.json"));
var import_const = require("../utils/const");
var Donate3Context = React.createContext({
  toAddress: import_const.ZERO_ADDRESS,
  type: import_const.DONATE_TYPE.NORMAL,
  color: "#764abc",
  total: 0,
  title: "Donate3"
});
var Donate3Provider = ({
  children,
  toAddress,
  type = import_const.DONATE_TYPE.NORMAL,
  color = "#764abc",
  title = "Donate3"
}) => {
  const [donorList, setDonorList] = React.useState();
  const total = donorList == null ? void 0 : donorList.result.records.length;
  const { donors: donorList2, loading } = (0, import_useDonate.useFetchDonors)(toAddress, "1");
  console.log("--------donorlist", donorList2, loading);
  React.useEffect(() => {
    setDonorList(import_DonorResult.default);
  }, []);
  return /* @__PURE__ */ React.createElement(
    Donate3Context.Provider,
    {
      value: { total, donorList, toAddress, title, type, color }
    },
    children
  );
};
var Donate3Context_default = Donate3Provider;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Donate3Context
});
