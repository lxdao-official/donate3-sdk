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

// src/Donate3/components/Avatar/Avatar.tsx
var Avatar_exports = {};
__export(Avatar_exports, {
  default: () => Avatar_default
});
module.exports = __toCommonJS(Avatar_exports);
var import_bind = __toESM(require("classnames/bind"));
var import_react = __toESM(require("react"));
var import_const = require("../../utils/const");
var import_nouns = require("../../utils/nouns");
var import_Avatar_module = __toESM(require("./Avatar.module.css"));
function Avatar(props) {
  let cx = import_bind.default.bind(import_Avatar_module.default);
  const myStyle = {
    backgroundImage: `url('${props.address}')`,
    width: props.width,
    height: props.width,
    borderRadius: props.width
  };
  const base64Hash = (0, import_nouns.getNounsBase64)(props.address || import_const.ZERO_ADDRESS);
  const allStyle = { ...myStyle, ...props.style };
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, base64Hash ? /* @__PURE__ */ import_react.default.createElement(
    "img",
    {
      className: cx(import_Avatar_module.default.avatar, props.className),
      alt: "avatar",
      src: `data:image/svg+xml;base64,${base64Hash}`,
      style: allStyle
    }
  ) : /* @__PURE__ */ import_react.default.createElement(
    "img",
    {
      className: cx(import_Avatar_module.default.avatar, props.className),
      style: allStyle,
      src: "https://i.328888.xyz/2023/03/12/vk3wZ.png"
    }
  ));
}
var Avatar_default = import_react.default.memo(Avatar);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
