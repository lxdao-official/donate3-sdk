# Donate3

This is an example component.

```jsx
import { Donate3 } from 'donate3-sdk';

const config = {
  type: 'embed', // 0 Float mode，1 Normal mode float\embed
  cid: 'bafkreif4w7p2fltakwj6oxukavz5ecw24e3uukfhhj2bkuznofdmxjoi7u',
  color: "#666",
  title: "Donate3",
  accountType: 1, // 账户类型 0： EOA， 1：safe account
  toAddress: "0xe395B9bA2F93236489ac953146485C435D1A267B",
  // avatar:'https://nftstorage.link/ipfs/bafkreidovf46msp6yqpsbfbl2n6whvdyfsupwwpucdguvkgt2isdnbac2i',
  avatar:'',
  safeAccounts:[{
    networkId:1,address:"0xe395B9bA2F93236489ac953146485C435D1A267B"
    },{networkId:10,address:"0xe395B9bA2F93236489ac953146485C435D1A267B"},{networkId:42161,address:"0xe395B9bA2F93236489ac953146485C435D1A267B"},{networkId:137,address:"0xe395B9bA2F93236489ac953146485C435D1A267B"},{networkId:59144,address:"0xe395B9bA2F93236489ac953146485C435D1A267B"},{networkId:5,address:"0xe395B9bA2F93236489ac953146485C435D1A267B"},{networkId:80001,address:"0xe395B9bA2F93236489ac953146485C435D1A267B"},
    {networkId:11155111 ,address:"0xe395B9bA2F93236489ac953146485C435D1A267B"},{networkId:420 ,address:"0xe395B9bA2F93236489ac953146485C435D1A267B"}],
  // safeAccounts: [{networkId: 5, address: '0xe395B9bA2F93236489ac953146485C435D1A267B'}], // [{networkId: 5, address: '0xd2567eb0893c8b5de7deac1cb66d8d60178767e8'}]
  demo:false
}
export default () => <Donate3 config={...config}/>
// const renderDonate3 = (domElement: HTMLElement | null, config: Props) => {
//   if (!domElement) throw new Error("Your DOM id is incorrect");

//   const root = ReactDOM.createRoot(domElement as HTMLElement);
//   root.render(<UFO config={config} />);
// };

// (window as any).renderDonate3 = renderDonate3;

// renderDonate3(document.getElementById("donate3_root"), config);
```
