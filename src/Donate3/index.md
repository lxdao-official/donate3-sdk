# Donate3

This is an example component.

```jsx
import { Donate3 } from 'donate3-sdk';

const config = {
  type: 'embed', // 0 Float mode，1 Normal mode float\embed
  color: "#666",
  title: "0xhardman",
  accountType: 1, // 账户类型 0： EOA， 1：safe account
  toAddress: "0xb15115A15d5992A756D003AE74C0b832918fAb75",
  safeAccounts: [{networkId: 5, address: '0xd2567eb0893c8b5de7deac1cb66d8d60178767e8'}], // [{networkId: 5, address: '0xd2567eb0893c8b5de7deac1cb66d8d60178767e8'}]
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
