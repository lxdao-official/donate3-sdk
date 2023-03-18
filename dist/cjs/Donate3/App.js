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
var import_Footer = __toESM(require("./components/Footer/Footer"));
var import_FormSection = __toESM(require("./components/FormSection/FormSection"));
var import_Header = __toESM(require("./components/Header/Header"));
var import_UserAvatar = __toESM(require("./components/UserAvatar/UserAvatar"));
var import_close = require("./images/close.svg");
var import_utils = require("./utils/index");
function App(props) {
  console.log("-------App");
  const [showForm, setShowForm] = (0, import_react.useState)(false);
  const [dialogStyle, setDialogStyle] = (0, import_react.useState)({});
  const dialogRef = (0, import_react.useRef)(null);
  let cx = import_bind.default.bind(import_App_module.default);
  const handleSwitchDialog = (event) => {
    const defaultStyle = {
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
      margin: "auto"
    };
    if (props.type === "2") {
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
  const renderDonate3Button = (type) => {
    if (type === "1") {
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
        showForm ? /* @__PURE__ */ import_react.default.createElement(import_close.ReactComponent, { className: import_App_module.default.closeimg }) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_DonateButton.default, { type: props.type }))
      );
    } else {
      return /* @__PURE__ */ import_react.default.createElement("div", { className: cx(import_App_module.default.donate3btn) }, /* @__PURE__ */ import_react.default.createElement(
        import_Header.default,
        {
          address: props.address,
          name: props.name,
          type: props.type,
          normalmode: true
        }
      ), /* @__PURE__ */ import_react.default.createElement("div", { onClick: handleSwitchDialog }, /* @__PURE__ */ import_react.default.createElement(import_DonateButton.default, { type: props.type })), /* @__PURE__ */ import_react.default.createElement(import_UserAvatar.default, { type: props.type, normalmode: true }));
    }
  };
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, props.type === "2" && showForm ? /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: import_App_module.default.mask,
      onClick: () => {
        setShowForm(false);
      }
    }
  ) : null, /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      className: showForm ? `${import_App_module.default.app} dialogAnimation` : import_App_module.default.hidden,
      style: { ...dialogStyle },
      ref: dialogRef
    },
    /* @__PURE__ */ import_react.default.createElement(
      import_Header.default,
      {
        address: props.address,
        name: props.name,
        type: props.type
      }
    ),
    /* @__PURE__ */ import_react.default.createElement(import_FormSection.default, { type: props.type, toAddress: props.address }),
    /* @__PURE__ */ import_react.default.createElement(import_Footer.default, null)
  ), renderDonate3Button(props.type));
}
var App_default = import_react.default.memo(App);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
