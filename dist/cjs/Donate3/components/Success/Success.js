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

// src/Donate3/components/Success/Success.tsx
var Success_exports = {};
__export(Success_exports, {
  default: () => Success_default
});
module.exports = __toCommonJS(Success_exports);
var import_react = __toESM(require("react"));
var import_success = require("../../images/success.svg");
var import_Footer = __toESM(require("../Footer/Footer"));
var import_Success_module = __toESM(require("./Success.module.css"));
function Success(props) {
  const [time, setTime] = (0, import_react.useState)(props.timeout);
  (0, import_react.useEffect)(() => {
    const myIterval = setInterval(() => {
      if (time === 0) {
        clearInterval(myIterval);
      } else {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1e3);
    return () => {
      clearInterval(myIterval);
    };
  }, [props.timeout]);
  return /* @__PURE__ */ import_react.default.createElement("div", { className: import_Success_module.default.wrap }, /* @__PURE__ */ import_react.default.createElement("div", { className: import_Success_module.default.img }, /* @__PURE__ */ import_react.default.createElement(import_success.ReactComponent, null)), /* @__PURE__ */ import_react.default.createElement("div", { className: import_Success_module.default.txt }, "感谢你的捐赠，爱你哟~"), /* @__PURE__ */ import_react.default.createElement("div", { className: import_Success_module.default.footer }, /* @__PURE__ */ import_react.default.createElement(
    "button",
    {
      className: import_Success_module.default.btn,
      type: "button",
      onClick: () => {
        props.setDonateCreateSuccess(false);
      }
    },
    "Close ",
    time,
    " s"
  ), /* @__PURE__ */ import_react.default.createElement(import_Footer.default, null)));
}
var Success_default = import_react.default.memo(Success);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
