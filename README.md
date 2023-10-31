# [&lt;Donate3 /&gt;](https://donate3.xyz/)

A donate in cryptocurrency component（Give me a cup of coffee Web3 version.）


<a href="https://twitter.com/intent/follow?screen_name=donate3official">
        <img src="https://img.shields.io/twitter/follow/donate3official?style=social&logo=X"
            alt="follow on Twitter"></a>

## Features

- [![npm (tag)](https://img.shields.io/npm/v/donate3-sdk)](https://www.npmjs.com/package/donate3-sdk) ![npm (downloads)](https://img.shields.io/npm/dm/donate3-sdk)

<br>

-   <b>\<Donate3 \/\></b> is a fundamental components for Web3 Apps.

## Documentation

- [Getting Started](https://donate3.xyz/)
- [`<Donate3 />`](https://donate3.xyz/components/Donate3)
- Markdown Link

## Development

### 1
Just as a js component for your project.

React:
```jsx
import { Donate3 } from 'donate3-sdk';
import 'donate3-sdk/dist/style.css'；

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
Nextjs
```jsx
import 'donate3-sdk/dist/style.css'
const Donate3 = dynamic(() => import('donate3-sdk').then(e => e.Donate3), {
  ssr: false,
})
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

### 2

Import a js CDN url to your own website;
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

```html
<div
  data-donate3-cid="bafkreibnfk3tnrmqpgn2b3ynqo7lp7wcolrynuspq54o2dwp25dshmmmou"
  data-donate3-type="1"
  data-donate3-color="#396AFF"
  data-donate3-title="charity3"
  data-donate3-account-type="1"
  data-donate3-safe-accounts='[{"networkId":1,"address":"0xb86EB6f8a39Db243a9ae544F180ef958dBA4e8b4"}]'
  data-donate3-to-address="0xb86EB6f8a39Db243a9ae544F180ef958dBA4e8b4"
></div>
<script src="https://cdn.jsdelivr.net/npm/donate3-sdk@1.0.38/dist/webpack/bundle.js"></script>
```

### 3

You can add the corresponding link to the markdown.

```html
<a href="Your Donate3 Link" target="_blank"><img src="https://www.donate3.xyz/Donate3ToMe.svg" alt="Donate3 To Me"></a>
```

<a href="https://www.donate3.xyz/demo" target="_blank"><img src="https://www.donate3.xyz/Donate3ToMe.svg" alt="Donate3 To Me"></a>

## Contact us
### Wechat
YanboTravelAllWorld
### Telegarm
[Donate3]()

## License

[MIT](/LICENSE) License

## Supported by LXDAO

<a target="_blank" href="https://lxdao.io/"><img alt="Supported by LXDAO" src="https://bafkreib7wsfivsbtinvx7yfou2b556ab32pojbjutkxfhh7v3y45qkevui.ipfs.nftstorage.link/" width="180" /></a>

This is a project supported by LXDAO. More links: [LXDAO](https://lxdao.io/) | [LXDAO Forum](https://forum.lxdao.io/) | [LXDAO Discord](https://discord.lxdao.io) | [LXDAO Twitter](https://twitter.com/LXDAO_Official).

LXDAO is an R&D-focused DAO in Web3. Our mission is: Gather the power of buidlers to buidl and support “LX” (valuable) Web3 projects sustainably and welcome 1 billion users into Web3. Welcome to join us.

[![Join our Discord server!](https://invidget.switchblade.xyz/HtcDdPgJ7D)](http://discord.gg/HtcDdPgJ7D)
