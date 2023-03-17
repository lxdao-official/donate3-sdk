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
var import_UserAvatar_module = __toESM(require("./UserAvatar.module.css"));
function UserAvatar(props) {
  const makeDonateUserAvatar = () => {
    let dom = [];
    const url = "https://i.imgur.com/RbcuN95.jpeg";
    const myStyle = {
      backgroundImage: `url('${url}')`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    };
    dom = ["aa", "bb", "cc", "cc1", "cc2", "cc3"].map((item) => /* @__PURE__ */ import_react.default.createElement("div", { key: item, className: import_UserAvatar_module.default.donateuseravatar, style: myStyle }));
    dom.push(
      /* @__PURE__ */ import_react.default.createElement("div", { key: "lastitem", className: import_UserAvatar_module.default.donateuseravatar }, "190")
    );
    return dom;
  };
  let cx = import_bind.default.bind(import_UserAvatar_module.default);
  return /* @__PURE__ */ import_react.default.createElement("div", { className: cx({ normalmode: props.normalmode && props.type === "2" }) }, /* @__PURE__ */ import_react.default.createElement("div", { className: import_UserAvatar_module.default.donateusers }, makeDonateUserAvatar()), props.type === "1" ? /* @__PURE__ */ import_react.default.createElement("div", { className: import_UserAvatar_module.default.donateuserdec }, "已有198人向他捐赠") : null);
}
var UserAvatar_default = UserAvatar;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
