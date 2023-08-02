import React from 'react';
import ReactDOM from 'react-dom/client';
import Donate3 from '../src/Donate3/index';
import { getFasterIpfsLink } from '../src/Donate3/utils/ipfsTools';

const donate3Roots = document.querySelectorAll('[data-donate3-cid]');

donate3Roots.forEach((root) => {
  const cid = root.dataset.donate3Cid;

  // If specified, use the gateway
  getFasterIpfsLink({
    ipfs: `https://nftstorage.link/ipfs/${cid}`,
    timeout: 4000,
  })
    .then(({ type, color, name, address, avatar, safeAccounts }) => {
      const config = {
        type,
        color,
        title: name,
        toAddress: address,
        safeAccounts,
        avatar,
        demo: false,
      };
      const reactRoot = ReactDOM.createRoot(root);
      reactRoot.render(<Donate3 config={config} />);
    })
    .catch(() => {
      console.error('error', 'getFasterIpfsLink-error');
    });
});
