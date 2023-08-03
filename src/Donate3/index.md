# Donate3

This is an example component.

```jsx
import { Donate3 } from 'donate3-sdk';

const config = {
  type: 'embed', // 0 Float mode，1 Normal mode float\embed
  color: "#666",
  title: "Donate3",
  accountType: 1, // 账户类型 0： EOA， 1：safe account
  toAddress: "0xe395B9bA2F93236489ac953146485C435D1A267B",
  // avatar:'https://nftstorage.link/ipfs/bafkreidovf46msp6yqpsbfbl2n6whvdyfsupwwpucdguvkgt2isdnbac2i',
  avatar:'',
  safeAccounts: [{networkId: 5, address: '0xe395B9bA2F93236489ac953146485C435D1A267B'}], // [{networkId: 5, address: '0xd2567eb0893c8b5de7deac1cb66d8d60178767e8'}]
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
