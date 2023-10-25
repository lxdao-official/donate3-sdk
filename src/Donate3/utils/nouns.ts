import { keccak256 as solidityKeccak256 } from '@ethersproject/solidity';
import { getNounData, getPseudorandomPart, ImageData } from '@nouns/assets';
import { EncodedImage } from '@nouns/assets/dist/types';
const { bgcolors, palette, images } = ImageData;
const { bodies, accessories, heads, glasses } = images;
const decodeImage = (image: string) => {
  let _a, _b;
  const data = image.replace(/^0x/, '');
  const paletteIndex = parseInt(data.substring(0, 2), 16);
  const bounds = {
    top: parseInt(data.substring(2, 4), 16),
    right: parseInt(data.substring(4, 6), 16),
    bottom: parseInt(data.substring(6, 8), 16),
    left: parseInt(data.substring(8, 10), 16),
  };
  const rects = data.substring(10);
  return {
    paletteIndex,
    bounds,
    rects:
      (_b =
        (_a =
          rects === null || rects === void 0
            ? void 0
            : rects.match(/.{1,4}/g)) === null || _a === void 0
          ? void 0
          : _a.map((rect: string) => [
              parseInt(rect.substring(0, 2), 16),
              parseInt(rect.substring(2, 4), 16),
            ])) !== null && _b !== void 0
        ? _b
        : [],
  };
};

const getRectLength = (
  currentX: number,
  drawLength: number,
  rightBound: number,
) => {
  const remainingPixelsInLine = rightBound - currentX;
  return drawLength <= remainingPixelsInLine
    ? drawLength
    : remainingPixelsInLine;
};

const buildSVG = (
  parts: EncodedImage[],
  paletteColors: any,
  bgColor: string,
) => {
  const svgWithoutEndTag = parts.reduce((result: any, part) => {
    const svgRects: string[] = [];
    const { bounds, rects } = decodeImage(part.data);
    let currentX = bounds.left;
    let currentY = bounds.top;
    rects.forEach((draw: any[]) => {
      let drawLength = draw[0];
      const colorIndex = draw[1];
      const hexColor = paletteColors[colorIndex];
      let length = getRectLength(currentX, drawLength, bounds.right);
      while (length > 0) {
        // Do not push rect if transparent
        if (colorIndex !== 0) {
          svgRects.push(
            `<rect width="${length * 10}" height="10" x="${currentX * 10}" y="${
              currentY * 10
            }" fill="#${hexColor}" />`,
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
    // eslint-disable-next-line no-param-reassign
    result += svgRects.join('');
    return result;
  }, `<svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="${bgColor ? `#${bgColor}` : 'none'}" />`);
  return `${svgWithoutEndTag}</svg>`;
};

export const getNounsBase64 = (address: string) => {
  const pseudorandomness = solidityKeccak256(['address'], [address]);
  const seed = {
    background: getPseudorandomPart(pseudorandomness, bgcolors.length, 0),
    body: getPseudorandomPart(pseudorandomness, bodies.length, 48),
    accessory: getPseudorandomPart(pseudorandomness, accessories.length, 96),
    head: getPseudorandomPart(pseudorandomness, heads.length, 144),
    glasses: getPseudorandomPart(pseudorandomness, glasses.length, 192),
  };
  const { parts, background } = getNounData(seed);
  const svgBinary1 = buildSVG(parts, palette, background);

  const svgBase641 = btoa(svgBinary1);
  return svgBase641;
};
