import { ImageData, getPseudorandomPart, getNounData } from '@nouns/assets'
import { buildSVG } from '@nouns/sdk'
import { ethers, BigNumber } from 'ethers'
import { keccak256 as solidityKeccak256 } from '@ethersproject/solidity'
// import { images, bgcolors } from '@nouns/assets/dist/image-data.json'

const { bgcolors, palette, images } = ImageData
const { bodies, accessories, heads, glasses } = images

console.log('-----', images, bgcolors)
// const { bodies, accessories, heads, glasses } = images
// const { palette } = ImageData // Used with `buildSVG``

export const generateNounsImageFromAddress = async (address: string) => {
  // const seed = getNounSeedFromBlockHash(nextNounId, latestBlockHash);
  // const { parts, background } = getNounData(seed);
  // const svgBinary = buildSVG(parts, palette, background);
  // const svgBase64 = btoa(svgBinary);
  // console.log(svgBase64);
  const pseudorandomness = solidityKeccak256(['address'], [address])
  const seed = {
    background: getPseudorandomPart(pseudorandomness, bgcolors.length, 0),
    body: getPseudorandomPart(pseudorandomness, bodies.length, 48),
    accessory: getPseudorandomPart(pseudorandomness, accessories.length, 96),
    head: getPseudorandomPart(pseudorandomness, heads.length, 144),
    glasses: getPseudorandomPart(pseudorandomness, glasses.length, 192),
  }
  const { parts, background } = getNounData(seed)
  console.log('=========', parts, background)
  const svgBinary = buildSVG(parts, palette, background)
  const svgBase64 = btoa(svgBinary)
  // const provider = new ethers.providers.JsonRpcProvider();
  // const hash = await provider.send("eth_getTransactionCount", [
  //   address,
  //   "latest",
  // ]);
  // const hashBuffer = Buffer.from(hash.slice(2), "hex");
  // const sha3Hash = ethers.utils.keccak256(hashBuffer);
  // // const bigNumber = ethers.utils.bigNumberify(sha3Hash);
  // const bigNumber = BigNumber.from(`0x${sha3Hash}`);
  // const seed = bigNumber.mod(8191).toNumber();
  //   const { parts, background } = getNounData(seed)
  //   const svgBinary = buildSVG(parts, palette, background)
  //   const svgBase64 = btoa(svgBinary)
  //   console.log(svgBase64)
}

export const generateColorFromAddress = (address) => {
  return address
}
