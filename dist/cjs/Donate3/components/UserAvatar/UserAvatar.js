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

// src/Donate3/components/UserAvatar/UserAvatar.tsx
var UserAvatar_exports = {};
__export(UserAvatar_exports, {
  default: () => UserAvatar_default
});
module.exports = __toCommonJS(UserAvatar_exports);
var import_bind = __toESM(require("classnames/bind"));
var import_react = __toESM(require("react"));
var import_Donate3Context = require("../../context/Donate3Context");
var import_const = require("../../utils/const");
var import_Avatar = __toESM(require("../Avatar/Avatar"));
var import_TotalCircle = __toESM(require("../TotalCircle/TotalCircle"));
var import_UserAvatar_module = __toESM(require("./UserAvatar.module.css"));
function UserAvatar(props) {
  let cx = import_bind.default.bind(import_UserAvatar_module.default);
  const { type, donorList, total } = import_react.default.useContext(import_Donate3Context.Donate3Context);
  const makeDonateUserAvatar = () => {
    var _a;
    if (!donorList)
      return;
    let dom = [];
    const records = (_a = donorList == null ? void 0 : donorList.result) == null ? void 0 : _a.records.slice(0, 5);
    dom = records.map((item, index) => {
      return /* @__PURE__ */ import_react.default.createElement(import_Avatar.default, { key: index, address: item.fromAddress, width: "40px" });
    });
    dom.push(
      /* @__PURE__ */ import_react.default.createElement(
        import_TotalCircle.default,
        {
          key: "lastitem",
          size: 40,
          className: import_UserAvatar_module.default.total
        }
      )
    );
    return dom;
  };
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: cx({
        normalmode: props.normalmode && type === import_const.DONATE_TYPE.NORMAL
      })
    },
    /* @__PURE__ */ import_react.default.createElement("div", { className: import_UserAvatar_module.default.donateusers }, makeDonateUserAvatar()),
    type === import_const.DONATE_TYPE.FLOAT ? /* @__PURE__ */ import_react.default.createElement("div", { className: import_UserAvatar_module.default.donateuserdec }, "已有", total, "人向他捐赠") : null
  );
}
var UserAvatar_default = import_react.default.memo(UserAvatar);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
