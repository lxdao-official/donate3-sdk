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

// src/Donate3/utils/nouns.ts
var nouns_exports = {};
__export(nouns_exports, {
  getNounsBase64: () => getNounsBase64
});
module.exports = __toCommonJS(nouns_exports);
var import_solidity = require("@ethersproject/solidity");
var import_assets = require("@nouns/assets");
var { bgcolors, palette, images } = import_assets.ImageData;
var { bodies, accessories, heads, glasses } = images;
var decodeImage = (image) => {
  let _a, _b;
  const data = image.replace(/^0x/, "");
  const paletteIndex = parseInt(data.substring(0, 2), 16);
  const bounds = {
    top: parseInt(data.substring(2, 4), 16),
    right: parseInt(data.substring(4, 6), 16),
    bottom: parseInt(data.substring(6, 8), 16),
    left: parseInt(data.substring(8, 10), 16)
  };
  const rects = data.substring(10);
  return {
    paletteIndex,
    bounds,
    rects: (_b = (_a = rects === null || rects === void 0 ? void 0 : rects.match(/.{1,4}/g)) === null || _a === void 0 ? void 0 : _a.map((rect) => [
      parseInt(rect.substring(0, 2), 16),
      parseInt(rect.substring(2, 4), 16)
    ])) !== null && _b !== void 0 ? _b : []
  };
};
var getRectLength = (currentX, drawLength, rightBound) => {
  const remainingPixelsInLine = rightBound - currentX;
  return drawLength <= remainingPixelsInLine ? drawLength : remainingPixelsInLine;
};
var buildSVG = (parts, paletteColors, bgColor) => {
  const svgWithoutEndTag = parts.reduce((result, part) => {
    const svgRects = [];
    const { bounds, rects } = decodeImage(part.data);
    let currentX = bounds.left;
    let currentY = bounds.top;
    rects.forEach((draw) => {
      let drawLength = draw[0];
      const colorIndex = draw[1];
      const hexColor = paletteColors[colorIndex];
      let length = getRectLength(currentX, drawLength, bounds.right);
      while (length > 0) {
        if (colorIndex !== 0) {
          svgRects.push(
            `<rect width="${length * 10}" height="10" x="${currentX * 10}" y="${currentY * 10}" fill="#${hexColor}" />`
          );
        }
        currentX += length;
        if (currentX === bounds.right) {
          currentX = bounds.left;
          currentY++;
        }
        drawLength -= length;
        length = getRectLength(currentX, drawLength, bounds.right);
      }
    });
    result += svgRects.join("");
    return result;
  }, `<svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="${bgColor ? `#${bgColor}` : "none"}" />`);
  return `${svgWithoutEndTag}</svg>`;
};
var getNounsBase64 = (address) => {
  const pseudorandomness = (0, import_solidity.keccak256)(["address"], [address]);
  const seed = {
    background: (0, import_assets.getPseudorandomPart)(pseudorandomness, bgcolors.length, 0),
    body: (0, import_assets.getPseudorandomPart)(pseudorandomness, bodies.length, 48),
    accessory: (0, import_assets.getPseudorandomPart)(pseudorandomness, accessories.length, 96),
    head: (0, import_assets.getPseudorandomPart)(pseudorandomness, heads.length, 144),
    glasses: (0, import_assets.getPseudorandomPart)(pseudorandomness, glasses.length, 192)
  };
  const { parts, background } = (0, import_assets.getNounData)(seed);
  const svgBinary1 = buildSVG(parts, palette, background);
  const svgBase641 = Buffer.from(svgBinary1).toString("base64");
  return svgBase641;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getNounsBase64
});
