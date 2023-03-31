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

// src/Donate3/components/TotalCircle/TotalCircle.tsx
var TotalCircle_exports = {};
__export(TotalCircle_exports, {
  default: () => TotalCircle_default
});
module.exports = __toCommonJS(TotalCircle_exports);
var import_bind = __toESM(require("classnames/bind"));
var import_react = __toESM(require("react"));
var import_Donate3Context = require("../../context/Donate3Context");
var import_TotalCircle_module = __toESM(require("./TotalCircle.module.css"));
function TotalCircle(props) {
  let cx = import_bind.default.bind(import_TotalCircle_module.default);
  const myStyle = {
    width: `${props.size}px`,
    height: `${props.size}px`,
    lineHeight: `${props.size - 4}px`
  };
  const allStyle = { ...myStyle, ...props.style };
  const { total } = (0, import_react.useContext)(import_Donate3Context.Donate3Context);
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", { className: cx(import_TotalCircle_module.default.circle, props.className), style: allStyle }, total));
}
var TotalCircle_default = import_react.default.memo(TotalCircle);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
