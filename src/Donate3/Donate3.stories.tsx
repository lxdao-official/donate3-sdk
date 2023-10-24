import Donate3 from './index';
import React from 'react';
export default {
    title: 'Donate3',
};
const config = {
    type: 'embed', // 0 Float mode，1 Normal mode float\embed
    cid: 'bafkreibnfk3tnrmqpgn2b3ynqo7lp7wcolrynuspq54o2dwp25dshmmmou',
    color: "#666",
    title: "Donate3",
    accountType: 1, // 账户类型 0： EOA， 1：safe account
    toAddress: "0xe395B9bA2F93236489ac953146485C435D1A267B",
    // avatar:'https://nftstorage.link/ipfs/bafkreidovf46msp6yqpsbfbl2n6whvdyfsupwwpucdguvkgt2isdnbac2i',
    avatar: '',
    safeAccounts: [{
        networkId: 1, address: "0xe395B9bA2F93236489ac953146485C435D1A267B"
    }, { networkId: 10, address: "0xe395B9bA2F93236489ac953146485C435D1A267B" }, { networkId: 42161, address: "0xe395B9bA2F93236489ac953146485C435D1A267B" }, { networkId: 137, address: "0xe395B9bA2F93236489ac953146485C435D1A267B" }, { networkId: 59144, address: "0xe395B9bA2F93236489ac953146485C435D1A267B" }, { networkId: 5, address: "0xe395B9bA2F93236489ac953146485C435D1A267B" }, { networkId: 80001, address: "0xe395B9bA2F93236489ac953146485C435D1A267B" },
    { networkId: 11155111, address: "0xe395B9bA2F93236489ac953146485C435D1A267B" }, { networkId: 420, address: "0xe395B9bA2F93236489ac953146485C435D1A267B" }],
    // safeAccounts: [{networkId: 5, address: '0xe395B9bA2F93236489ac953146485C435D1A267B'}], // [{networkId: 5, address: '0xd2567eb0893c8b5de7deac1cb66d8d60178767e8'}]
    demo: false
}
export const Donate3Primary = () => {
    return <Donate3 config={config} />
} 