import React from 'react';
import ReactDOM from 'react-dom/client';
import Donate3 from '../src/Donate3/index';
import { getFasterIpfsLink } from '../src/Donate3/utils/ipfsTools';

// dom selection priority, cid is preferred, followed by address
// cid > address
const cidDom = document.querySelectorAll('[data-donate3-cid]');
const addressDom = document.querySelectorAll('[data-donate3-to-address]');

const ipfsFlag = cidDom?.length > 0 && cidDom?.[0]?.dataset.donate3Cid;
const donate3Roots = ipfsFlag ? cidDom : addressDom;

// If specified, use the gateway
const getInfoFromIpfs = async (root) => {
  const cid = root.dataset.donate3Cid;
  try {
    const info = await getFasterIpfsLink({
      ipfs: `https://nftstorage.link/ipfs/${cid}`,
      timeout: 4000,
    });

    const {
      type = 0,
      color,
      name,
      address,
      avatar,
      accountType,
      safeAccounts,
    } = info;
    return {
      type,
      color,
      title: name,
      accountType,
      toAddress: address,
      safeAccounts,
      avatar,
      demo: false,
    };
  } catch (error) {
    console.error('error', 'getFasterIpfsLink-error');
  }
};

const getDonate3Params = (root, isIpfs) => {
  if (isIpfs) {
    return getInfoFromIpfs(root);
  } else {
    return {
      type: root.dataset.donate3Type,
      color: root.dataset.donate3Color,
      title: root.dataset.donate3Title,
      toAddress: root.dataset.donate3ToAddress,
      demo: root.dataset.donate3Demo === 'true' ? true : false,
      avatar: root.dataset.donate3Avatar,
      accountType: root.dataset.accountType,
      safeAccounts:
        root.dataset.donate3Safeaccounts &&
        JSON.parse(root.dataset.donate3Safeaccounts),
    };
  }
};

donate3Roots.forEach(async (root) => {
  const config = await getDonate3Params(root, ipfsFlag);
  const reactRoot = ReactDOM.createRoot(root);

  reactRoot.render(<Donate3 config={config} />);
});
