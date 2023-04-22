import React from 'react';
import ReactDOM from 'react-dom/client';
import Donate3 from '../src/Donate3/index';

const donate3Roots = document.querySelectorAll('[data-donate3-to-address]');
donate3Roots.forEach((root) => {
  let demo = false;
  if(root.dataset.demo === 'true'){
    demo = true;
  }
  const config = {
    type:Number(root.dataset.donate3Type),
    color:root.dataset.donate3Color,
    title:root.dataset.donate3Title,
    toAddress:root.dataset.donate3ToAddress,
    demo:demo,
  }
  console.log('donate3: ', config,root.dataset);
  const reactRoot = ReactDOM.createRoot(root);
  reactRoot.render(<Donate3 config={config} />);
});
