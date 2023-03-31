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

// src/Donate3/components/DonateButton/DonateButton.tsx
var DonateButton_exports = {};
__export(DonateButton_exports, {
  default: () => DonateButton_default
});
module.exports = __toCommonJS(DonateButton_exports);
var import_bind = __toESM(require("classnames/bind"));
var import_react = __toESM(require("react"));
var import_Donate3Context = require("../../context/Donate3Context");
var import_logowhite = require("../../images/logowhite.svg");
var import_const = require("../../utils/const");
var import_DonateButton_module = __toESM(require("./DonateButton.module.css"));
function DonateButton() {
  let cx = import_bind.default.bind(import_DonateButton_module.default);
  const { type, toAddress } = import_react.default.useContext(import_Donate3Context.Donate3Context);
  let wrapStyles = cx(
    import_DonateButton_module.default.wrap,
    {
      largewrap: type === import_const.DONATE_TYPE.NORMAL
    },
    {
      tinywrap: type === import_const.DONATE_TYPE.FLOAT
    }
  );
  return /* @__PURE__ */ import_react.default.createElement("div", { className: wrapStyles }, /* @__PURE__ */ import_react.default.createElement(import_logowhite.ReactComponent, { className: import_DonateButton_module.default.img }), /* @__PURE__ */ import_react.default.createElement("span", null, "Donate3"), type === import_const.DONATE_TYPE.NORMAL ? /* @__PURE__ */ import_react.default.createElement("span", null, toAddress && `${toAddress.slice(0, 6)}...${toAddress.slice(
    toAddress.length - 4
  )}`) : null);
}
var DonateButton_default = import_react.default.memo(DonateButton);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
