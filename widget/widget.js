import React from 'react';
import ReactDOM from 'react-dom/client';
// import '../src/rainbow.css';
// import '@rainbow-me/rainbowkit/styles.css';
// todo copy from above, webpack issue
// import '../components/Donate/index.css';
import Donate3 from '../src/Donate3/index';

const donate3Roots = document.querySelectorAll('[data-donate-to]');
donate3Roots.forEach((root) => {
  const config = {
    address:root.dataset.donateTo,
    type:root.dataset.type,
    color:root.dataset.color,
    name:root.dataset.name
  }
  console.log('donateTo: ', config);
  const reactRoot = ReactDOM.createRoot(root);
  reactRoot.render(<Donate3 config={config} />);
});
