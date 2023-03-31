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

// src/Donate3/components/Header/Header.tsx
var Header_exports = {};
__export(Header_exports, {
  default: () => Header_default
});
module.exports = __toCommonJS(Header_exports);
var import_bind = __toESM(require("classnames/bind"));
var import_react = __toESM(require("react"));
var import_Donate3Context = require("../../context/Donate3Context");
var import_useNouns = __toESM(require("../../hooks/useNouns"));
var import_const = require("../../utils/const");
var import_TotalCircle = __toESM(require("../TotalCircle/TotalCircle"));
var import_Header_module = __toESM(require("./Header.module.css"));
function Header({ setShowDonorList, normalmode }) {
  const { type, toAddress, title } = import_react.default.useContext(import_Donate3Context.Donate3Context);
  const base64Hash = (0, import_useNouns.default)(toAddress);
  let cx = import_bind.default.bind(import_Header_module.default);
  return /* @__PURE__ */ import_react.default.createElement(
    "header",
    {
      className: cx(import_Header_module.default.header, {
        normalmode: normalmode && type === import_const.DONATE_TYPE.NORMAL
      })
    },
    /* @__PURE__ */ import_react.default.createElement("div", { className: import_Header_module.default.recipientinfo }, /* @__PURE__ */ import_react.default.createElement("div", null, "Donate to ", title), /* @__PURE__ */ import_react.default.createElement("div", null, "To:", toAddress && `${toAddress.slice(0, 6)}...${toAddress.slice(
      toAddress.length - 4
    )}`)),
    /* @__PURE__ */ import_react.default.createElement(
      "div",
      {
        className: import_Header_module.default.avatarwrap,
        onClick: () => {
          setShowDonorList(true);
        }
      },
      /* @__PURE__ */ import_react.default.createElement("fieldset", { className: import_Header_module.default.fieldset }, /* @__PURE__ */ import_react.default.createElement("legend", null, base64Hash ? /* @__PURE__ */ import_react.default.createElement(
        "img",
        {
          className: import_Header_module.default.avatar,
          alt: "avatar",
          src: `data:image/svg+xml;base64,${base64Hash}`
        }
      ) : /* @__PURE__ */ import_react.default.createElement(
        "img",
        {
          className: import_Header_module.default.avatar,
          src: "https://i.328888.xyz/2023/03/12/vk3wZ.png"
        }
      ))),
      normalmode ? null : /* @__PURE__ */ import_react.default.createElement(import_TotalCircle.default, { size: 30, className: import_Header_module.default.total })
    )
  );
}
var Header_default = import_react.default.memo(Header);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
