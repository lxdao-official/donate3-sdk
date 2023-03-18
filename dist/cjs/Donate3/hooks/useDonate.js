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

// src/Donate3/hooks/useDonate.ts
var useDonate_exports = {};
__export(useDonate_exports, {
  default: () => useDonate_default
});
module.exports = __toCommonJS(useDonate_exports);
var import_react = require("react");
var BASE_URL = "https://api.donate3.xyz";
var useDonate = () => {
  const createDonate = (0, import_react.useCallback)(async (args) => {
    console.log("inner", args);
    const res = await fetch(`${BASE_URL}/api/v1/donate/create`, {
      method: "POST",
      mode: "cors",
      // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(args)
    });
    const json = await res.json();
    const { code, result } = json;
    console.log(":::", code, result);
    return result;
  }, []);
  return createDonate;
};
var useDonate_default = useDonate;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
