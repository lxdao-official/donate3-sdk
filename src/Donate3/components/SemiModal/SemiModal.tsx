
import classNames from 'classnames/bind';
import React, { useContext, useEffect } from 'react';
import { Donate3Context } from '../../context/Donate3Context';
import Footer from '../Footer/Footer';
import UserAvatar from '../UserAvatar/UserAvatar';
import styles from './SemiModal.module.css';
import { useWallet } from '@solana/wallet-adapter-react';

import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
function SemiModal() {
  const { connect, select } = useWallet();
  let cx = classNames.bind(styles);
  const { showSemiModal, isConnected, setShowLoading, color } =
    useContext(Donate3Context);

  return (
    <>
      {showSemiModal ? (
        <div
          className={cx(
            styles.semiModal,
            { in: !isConnected || showSemiModal },
            { out: isConnected || !showSemiModal },
          )}
        >
          <div className={styles.bgmask}></div>
          <div className={styles.semiwrap}>
            <div className={styles.semiimg}>
              <img
                className={styles.walleticon}
                src={'https://lxdao-donate3.s3.amazonaws.com/wallet.png'}
              ></img>
              <img
                className={styles.btcicon}
                src="https://lxdao-donate3.s3.amazonaws.com/coin.png"
              ></img>
            </div>
            <UserAvatar></UserAvatar>
            <div
              className={styles.semidonatebtn}
              style={{ background: color, cursor: 'pointer' }}
              onClick={() => {
                setShowLoading(true);
                connect()
              }}
            >
              <span>Connect wallet for donation</span>
            </div>
            <Footer></Footer>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default React.memo(SemiModal);
