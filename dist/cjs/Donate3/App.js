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

// src/Donate3/App.tsx
var App_exports = {};
__export(App_exports, {
  default: () => App_default
});
module.exports = __toCommonJS(App_exports);
var import_bind = __toESM(require("classnames/bind"));
var import_react = __toESM(require("react"));
var import_App_module = __toESM(require("./App.module.css"));
var import_DonateButton = __toESM(require("./components/DonateButton/DonateButton"));
var import_DonorList = __toESM(require("./components/DonorList/DonorList"));
var import_Footer = __toESM(require("./components/Footer/Footer"));
var import_FormSection = __toESM(require("./components/FormSection/FormSection"));
var import_Header = __toESM(require("./components/Header/Header"));
var import_UserAvatar = __toESM(require("./components/UserAvatar/UserAvatar"));
var import_Donate3Context = require("./context/Donate3Context");
var import_close = require("./images/close.svg");
var import_const = require("./utils/const");
var import_utils = require("./utils/index");
function App() {
  const [showForm, setShowForm] = (0, import_react.useState)(false);
  const [dialogStyle, setDialogStyle] = (0, import_react.useState)({});
  const [showDonorList, setShowDonorList] = (0, import_react.useState)(false);
  const { type } = import_react.default.useContext(import_Donate3Context.Donate3Context);
  let cx = import_bind.default.bind(import_App_module.default);
  const handleSwitchDialog = (event) => {
    const defaultStyle = {
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
      margin: "auto"
    };
    if (type === import_const.DONATE_TYPE.NORMAL) {
      setDialogStyle(defaultStyle);
    } else {
      const { elementBottom, elementRight } = (0, import_utils.getElementPosition)(
        event == null ? void 0 : event.currentTarget
      );
      if (!showForm) {
        if (window.innerWidth > 768) {
          setDialogStyle({ right: elementRight, bottom: elementBottom + 70 });
        } else {
          setDialogStyle(defaultStyle);
        }
      }
    }
    setShowForm(!showForm);
  };
  const renderDonate3Button = (type2) => {
    if (type2 === import_const.DONATE_TYPE.FLOAT) {
      return /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          className: cx(
            { close: showForm },
            { floatmode: !showForm },
            import_App_module.default.btn,
            import_App_module.default["btn-animated"],
            import_App_module.default["btn-white"],
            import_App_module.default.donate3btn
          ),
          onClick: handleSwitchDialog
        },
        showForm ? /* @__PURE__ */ import_react.default.createElement(import_close.ReactComponent, { className: import_App_module.default.closeimg }) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_DonateButton.default, null))
      );
    } else {
      return /* @__PURE__ */ import_react.default.createElement("div", { className: cx(import_App_module.default.donate3btn) }, /* @__PURE__ */ import_react.default.createElement(
        import_Header.default,
        {
          setShowDonorList,
          normalmode: true
        }
      ), /* @__PURE__ */ import_react.default.createElement("div", { onClick: handleSwitchDialog }, /* @__PURE__ */ import_react.default.createElement(import_DonateButton.default, null)), /* @__PURE__ */ import_react.default.createElement(
        "div",
        {
          onClick: () => {
            setShowDonorList(true);
          }
        },
        /* @__PURE__ */ import_react.default.createElement(import_UserAvatar.default, { normalmode: true })
      ));
    }
  };
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, type === import_const.DONATE_TYPE.NORMAL && (showForm || showDonorList) ? /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: import_App_module.default.mask,
      onClick: () => {
        setShowForm(false);
        setShowDonorList(false);
      }
    }
  ) : null, /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: showForm ? `${import_App_module.default.app} dialogAnimation` : import_App_module.default.hidden,
      style: { ...dialogStyle }
    },
    /* @__PURE__ */ import_react.default.createElement(import_Header.default, { setShowDonorList }),
    /* @__PURE__ */ import_react.default.createElement(import_FormSection.default, null),
    /* @__PURE__ */ import_react.default.createElement(import_Footer.default, null)
  ), /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: showDonorList ? `${import_App_module.default.app} dialogAnimation` : import_App_module.default.hidden,
      style: { ...dialogStyle }
    },
    /* @__PURE__ */ import_react.default.createElement(import_DonorList.default, { setShowDonorList })
  ), renderDonate3Button(type));
}
var App_default = import_react.default.memo(App);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
