# [&lt;Donate3 /&gt;](https://donate3.xyz/) 

 A donate in cryptocurrency component（Give me a cup of coffee）

## Features

- [![npm (tag)](https://img.shields.io/npm/v/donate3-sdk)](https://www.npmjs.com/package/donate3-sdk) ![npm (downloads)](https://img.shields.io/npm/dm/donate3-sdk) <b>\<Donate3 \/\></b> is a fundamental components for Web3 Apps. 
- [![npm (tag)](https://img.shields.io/npm/v/@lxdao/uploader3)](https://www.npmjs.com/package/@lxdao/uploader3) ![npm (downloads)](https://img.shields.io/npm/dm/@lxdao/uploader3) <b>\<Uploader3 \/\></b> is a React-based Web3 image upload component that supports multiple image uploads, image cropping, and uploading images to Web3 Storage providers (like IPFS). There are two ways for uploading, by using a backend API or the Uploader3 Connector.
- [![npm (tag)](https://img.shields.io/npm/v/@lxdao/uploader3-connector)](https://www.npmjs.com/package/@lxdao/uploader3-connector) ![npm (downloads)](https://img.shields.io/npm/dm/@lxdao/uploader3-connector) <b>Uploader3 Connector</b> is a connector for Uploader3. Currently, it only supports NFT.storage IPFS service provider.

## Documentation

- [Getting Started](https://donate3.xyz/)
- [`<Donate3 />`](https://donate3.xyz/components/Donate3)

## Development

The first method uses Donate3，Just as a js component for your project

```jsx
import { Donate3 } from 'donate3-sdk';

const config = {
  cid: 'bafkreibnfk3tnrmqpgn2b3ynqo7lp7wcolrynuspq54o2dwp25dshmmmou', 
  // The cid can be generated after the official website configuration information
  // If cid exists, other parameters are not required, 
  // otherwise the remaining parameters are required
  type: 1, // 0 Float mode，1 Normal mode
  color: "#396AFF", // setting primary color
  title: "Charity3", // Your donate project title
  accountType: 1, // 0 Externally Owned Accounts, 1 safe Accounts
  safeAccounts: [ 
    { 
      networkId: 1, // the id of the network
      address: "0xb86EB6f8a39Db243a9ae544F180ef958dBA4e8b4", 
      // Your address on the network to accept donations， Use `0x{String}`
    }
  ], // 
  toAddress: "0xb86EB6f8a39Db243a9ae544F180ef958dBA4e8b4", 
  // Your donate address， Use `0x{String}`
}
export default () => <Donate3 config={...config}/>
```

The second method uses Donate3，Import a js CDN url to your own website;
  `If cid exists, other parameters are not required, otherwise the remaining parameters are required`

  `data-donate3-cid`: The cid can be generated after the official website configuration information
  `data-donate3-type`: 0 Float mode，1 Normal mode
  `data-donate3-color`: setting primary color
  `data-donate3-title`: Your donate project title
  `data-donate3-account-type`: 0 Externally Owned Accounts, 1 safe Accounts
  `data-donate3-safe-accounts`: [
    {
      networkId: 1, // the id of the network
      address: "0xb86EB6f8a39Db243a9ae544F180ef958dBA4e8b4", 
      // Your address on the network to accept donations， Use `0x{String}`
    }
  ] // This field is an array and needs to be stringified, like this _'[{"networkId":1,"address":"0xb86EB6f8a39Db243a9ae544F180ef958dBA4e8b4"}]'_
  `data-donate3-to-address`: Your donate address， Use `0x{String}`

``` html
  <div
    data-donate3-cid="bafkreibnfk3tnrmqpgn2b3ynqo7lp7wcolrynuspq54o2dwp25dshmmmou"
    data-donate3-type="1" 
    data-donate3-color="#396AFF"
    data-donate3-title="charity3"
    data-donate3-account-type="1"
    data-donate3-safe-accounts='[{"networkId":1,"address":"0xb86EB6f8a39Db243a9ae544F180ef958dBA4e8b4"}]'
    data-donate3-to-address="0xb86EB6f8a39Db243a9ae544F180ef958dBA4e8b4"
  ></div> 
  <script src="https://cdn.jsdelivr.net/npm/donate3-sdk@1.0.23/dist/webpack/bundle.js"></script>
```

## Sponsors

<a href="https://fil.org/" target="_blank"><img width="200" src="https://bafkreidhplaw3hpo6gmhrkqwzvw2ejnvxuuai2r5vsjhzjxmosanagrgoy.ipfs.nftstorage.link/" /></a>

If you are willing to support this project, please contact with the project PM [DAODAO](https://twitter.com/daodao).

## Contributors

- [@ufoqhmdt](https://github.com/ufoqhmdt)
- [@brucexu-eth](https://github.com/brucexu-eth)
- [@daodao](https://github.com/daodao)
- [@hardman](https://github.com/hardman)

## License

[MIT](/LICENSE) License

## Supported by LXDAO

<a target="_blank" href="https://lxdao.io/"><img alt="Supported by LXDAO" src="https://bafkreib7wsfivsbtinvx7yfou2b556ab32pojbjutkxfhh7v3y45qkevui.ipfs.nftstorage.link/" width="180" /></a>

This is a project supported by LXDAO. More links: [LXDAO](https://lxdao.io/) | [LXDAO Forum](https://forum.lxdao.io/) | [LXDAO Discord](https://discord.lxdao.io) | [LXDAO Twitter](https://twitter.com/LXDAO_Official).

LXDAO is an R&D-focused DAO in Web3. Our mission is: Gather the power of buidlers to buidl and support “LX” (valuable) Web3 projects sustainably and welcome 1 billion users into Web3. Welcome to join us.

[![Join our Discord server!](https://invidget.switchblade.xyz/HtcDdPgJ7D)](http://discord.gg/HtcDdPgJ7D)
