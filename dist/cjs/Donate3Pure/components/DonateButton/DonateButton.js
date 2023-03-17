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

// src/Donate3Pure/components/DonateButton/DonateButton.tsx
var DonateButton_exports = {};
__export(DonateButton_exports, {
  default: () => DonateButton_default
});
module.exports = __toCommonJS(DonateButton_exports);
var import_bind = __toESM(require("classnames/bind"));
var import_react = __toESM(require("react"));
var import_logowhite = require("../../images/logowhite.svg");
var import_DonateButton_module = __toESM(require("./DonateButton.module.css"));
function DonateButton(props) {
  let cx = import_bind.default.bind(import_DonateButton_module.default);
  let wrapStyles = cx(
    import_DonateButton_module.default.wrap,
    {
      largewrap: props.type === "2"
    },
    {
      tinywrap: props.type === "1"
    }
  );
  return /* @__PURE__ */ import_react.default.createElement("div", { className: wrapStyles }, /* @__PURE__ */ import_react.default.createElement(import_logowhite.ReactComponent, { className: import_DonateButton_module.default.img }), /* @__PURE__ */ import_react.default.createElement("span", null, "Donate3"), props.type === "2" ? /* @__PURE__ */ import_react.default.createElement("span", null, "address todo") : null);
}
var DonateButton_default = DonateButton;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
