# Donate3

This is an example component.

```jsx
import { Donate3 } from 'donate3-sdk';

const config = {
  type: 1,
  color: "#396AFF",
  name: "Charity3",
  address: "0xb86EB6f8a39Db243a9ae544F180ef958dBA4e8b4",
}
// const renderDonate3 = (domElement: HTMLElement | null, config: Props) => {
//   if (!domElement) throw new Error("Your DOM id is incorrect");

//   const root = ReactDOM.createRoot(domElement as HTMLElement);
//   root.render(<UFO config={config} />);
// };

// (window as any).renderDonate3 = renderDonate3;

// renderDonate3(document.getElementById("donate3_root"), config);

export default () => <Donate3 title="Hello dumi!" config={...config}/>
```
