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

// src/Donate3/hooks/useNouns.ts
var useNouns_exports = {};
__export(useNouns_exports, {
  default: () => useNouns_default
});
module.exports = __toCommonJS(useNouns_exports);
var import_react = require("react");
var import_nouns = require("../utils/nouns");
var useNouns = (address) => {
  const [nounsBase64, setnounsBase64] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    const fetchData = async () => {
      const base64 = null;
      if (address) {
        (0, import_nouns.getNounsBase64)(address);
      }
      setnounsBase64(base64);
    };
    fetchData().catch(console.error);
    return () => {
    };
  }, []);
  return nounsBase64;
};
var useNouns_default = useNouns;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
