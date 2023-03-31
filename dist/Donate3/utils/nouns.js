import { keccak256 as solidityKeccak256 } from '@ethersproject/solidity';
import { getNounData, getPseudorandomPart, ImageData } from '@nouns/assets';
var bgcolors = ImageData.bgcolors,
  palette = ImageData.palette,
  images = ImageData.images;
var bodies = images.bodies,
  accessories = images.accessories,
  heads = images.heads,
  glasses = images.glasses;
var decodeImage = function decodeImage(image) {
  var _a, _b;
  var data = image.replace(/^0x/, '');
  var paletteIndex = parseInt(data.substring(0, 2), 16);
  var bounds = {
    top: parseInt(data.substring(2, 4), 16),
    right: parseInt(data.substring(4, 6), 16),
    bottom: parseInt(data.substring(6, 8), 16),
    left: parseInt(data.substring(8, 10), 16)
  };
  var rects = data.substring(10);
  return {
    paletteIndex: paletteIndex,
    bounds: bounds,
    rects: (_b = (_a = rects === null || rects === void 0 ? void 0 : rects.match(/.{1,4}/g)) === null || _a === void 0 ? void 0 : _a.map(function (rect) {
      return [parseInt(rect.substring(0, 2), 16), parseInt(rect.substring(2, 4), 16)];
    })) !== null && _b !== void 0 ? _b : []
  };
};
var getRectLength = function getRectLength(currentX, drawLength, rightBound) {
  var remainingPixelsInLine = rightBound - currentX;
  return drawLength <= remainingPixelsInLine ? drawLength : remainingPixelsInLine;
};
var buildSVG = function buildSVG(parts, paletteColors, bgColor) {
  var svgWithoutEndTag = parts.reduce(function (result, part) {
    var svgRects = [];
    var _decodeImage = decodeImage(part.data),
      bounds = _decodeImage.bounds,
      rects = _decodeImage.rects;
    var currentX = bounds.left;
    var currentY = bounds.top;
    rects.forEach(function (draw) {
      var drawLength = draw[0];
      var colorIndex = draw[1];
      var hexColor = paletteColors[colorIndex];
      var length = getRectLength(currentX, drawLength, bounds.right);
      while (length > 0) {
        // Do not push rect if transparent
        if (colorIndex !== 0) {
          svgRects.push("<rect width=\"".concat(length * 10, "\" height=\"10\" x=\"").concat(currentX * 10, "\" y=\"").concat(currentY * 10, "\" fill=\"#").concat(hexColor, "\" />"));
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
    // eslint-disable-next-line no-param-reassign
    result += svgRects.join('');
    return result;
  }, "<svg width=\"320\" height=\"320\" viewBox=\"0 0 320 320\" xmlns=\"http://www.w3.org/2000/svg\" shape-rendering=\"crispEdges\"><rect width=\"100%\" height=\"100%\" fill=\"".concat(bgColor ? "#".concat(bgColor) : 'none', "\" />"));
  return "".concat(svgWithoutEndTag, "</svg>");
};
export var getNounsBase64 = function getNounsBase64(address) {
  var pseudorandomness = solidityKeccak256(['address'], [address]);
  var seed = {
    background: getPseudorandomPart(pseudorandomness, bgcolors.length, 0),
    body: getPseudorandomPart(pseudorandomness, bodies.length, 48),
    accessory: getPseudorandomPart(pseudorandomness, accessories.length, 96),
    head: getPseudorandomPart(pseudorandomness, heads.length, 144),
    glasses: getPseudorandomPart(pseudorandomness, glasses.length, 192)
  };
  var _getNounData = getNounData(seed),
    parts = _getNounData.parts,
    background = _getNounData.background;
  var svgBinary1 = buildSVG(parts, palette, background);
  var svgBase641 = Buffer.from(svgBinary1).toString('base64');

  // console.log('pseudorandomness', pseudorandomness);
  // console.log('svgBase641', svgBase641);
  return svgBase641;
};