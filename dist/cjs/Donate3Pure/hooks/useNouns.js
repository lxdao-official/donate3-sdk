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

// src/Donate3Pure/hooks/useNouns.ts
var useNouns_exports = {};
__export(useNouns_exports, {
  default: () => useNouns_default
});
module.exports = __toCommonJS(useNouns_exports);
var import_react = require("react");
var useNouns = (address) => {
  const [nounsBase64, setnounsBase64] = (0, import_react.useState)("");
  (0, import_react.useEffect)(() => {
    const fetchData = async () => {
      const getData = async (address2) => {
        const res = await fetch(
          `http://localhost:3000/api/getnouns/${address2}`
        );
        const json = await res.json();
        const { code, base64: base642 } = json;
        console.log(code);
        return base642;
      };
      const base64 = await getData(address);
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
