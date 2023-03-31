var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/Donate3/utils/const.ts
var const_exports = {};
__export(const_exports, {
  DONATE_TYPE: () => DONATE_TYPE,
  ZERO_ADDRESS: () => ZERO_ADDRESS
});
module.exports = __toCommonJS(const_exports);
var ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
var DONATE_TYPE = /* @__PURE__ */ ((DONATE_TYPE2) => {
  DONATE_TYPE2[DONATE_TYPE2["FLOAT"] = 0] = "FLOAT";
  DONATE_TYPE2[DONATE_TYPE2["NORMAL"] = 1] = "NORMAL";
  return DONATE_TYPE2;
})(DONATE_TYPE || {});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DONATE_TYPE,
  ZERO_ADDRESS
});
