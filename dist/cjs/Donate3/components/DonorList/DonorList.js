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

// src/Donate3/components/DonorList/DonorList.tsx
var DonorList_exports = {};
__export(DonorList_exports, {
  default: () => DonorList_default
});
module.exports = __toCommonJS(DonorList_exports);
var import_bind = __toESM(require("classnames/bind"));
var import_react = __toESM(require("react"));
var import_Donate3Context = require("../../context/Donate3Context");
var import_close = require("../../images/close.svg");
var import_sortbg = require("../../images/sortbg.svg");
var import_Avatar = __toESM(require("../Avatar/Avatar"));
var import_TotalCircle = __toESM(require("../TotalCircle/TotalCircle"));
var import_DonorList_module = __toESM(require("./DonorList.module.css"));
function DonorList({ setShowDonorList }) {
  let cx = import_bind.default.bind(import_DonorList_module.default);
  const { donorList } = (0, import_react.useContext)(import_Donate3Context.Donate3Context);
  const makeDonateDonorAvatar = (datas) => {
    var _a;
    if (!datas)
      return;
    let dom = [];
    const records = (_a = datas == null ? void 0 : datas.result) == null ? void 0 : _a.records;
    dom = records == null ? void 0 : records.map((item, index) => {
      return /* @__PURE__ */ import_react.default.createElement(
        import_Avatar.default,
        {
          key: index,
          address: item.fromAddress,
          className: import_DonorList_module.default.itemavatar
        }
      );
    });
    dom.push(
      /* @__PURE__ */ import_react.default.createElement(
        import_TotalCircle.default,
        {
          key: "lastitem",
          size: 40,
          className: import_DonorList_module.default.lastavatar
        }
      )
    );
    return dom;
  };
  const makeTopDom = (datas) => {
    var _a, _b;
    if (!datas)
      return;
    let dom = [];
    const records = (_b = (_a = datas == null ? void 0 : datas.result) == null ? void 0 : _a.records) == null ? void 0 : _b.slice(0, 3);
    dom = records == null ? void 0 : records.map((item, index) => {
      return /* @__PURE__ */ import_react.default.createElement("div", { key: index, className: import_DonorList_module.default.topitem }, /* @__PURE__ */ import_react.default.createElement("div", { className: import_DonorList_module.default.topimg }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.default, { address: item.fromAddress, width: "60px" })), /* @__PURE__ */ import_react.default.createElement("div", { className: import_DonorList_module.default.amount }, "$", item.usdValue), /* @__PURE__ */ import_react.default.createElement("div", { className: import_DonorList_module.default.count }, "捐赠", item.value, "次"));
    });
    return dom;
  };
  return /* @__PURE__ */ import_react.default.createElement("div", { className: cx(import_DonorList_module.default.wrap) }, /* @__PURE__ */ import_react.default.createElement("div", { className: cx(import_DonorList_module.default.content) }, /* @__PURE__ */ import_react.default.createElement("div", { className: import_DonorList_module.default.header }, /* @__PURE__ */ import_react.default.createElement("div", { className: import_DonorList_module.default.title }, /* @__PURE__ */ import_react.default.createElement("span", { className: import_DonorList_module.default.titletxt }, "Donor"), /* @__PURE__ */ import_react.default.createElement(
    import_close.ReactComponent,
    {
      style: { transform: "scale(0.5)" },
      onClick: () => {
        setShowDonorList(false);
      }
    }
  )), /* @__PURE__ */ import_react.default.createElement("div", { className: import_DonorList_module.default.top }, makeTopDom(donorList), /* @__PURE__ */ import_react.default.createElement("div", { className: import_DonorList_module.default.bg }, /* @__PURE__ */ import_react.default.createElement(import_sortbg.ReactComponent, null)))), /* @__PURE__ */ import_react.default.createElement("div", { className: import_DonorList_module.default.list }, makeDonateDonorAvatar(donorList))));
}
var DonorList_default = import_react.default.memo(DonorList);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
