import { useWallet } from '@aptos-labs/wallet-adapter-react';
import classNames from 'classnames/bind';
import { PetraWallet } from 'petra-plugin-wallet-adapter';
import React, { useContext } from 'react';
import { Donate3Context } from '../../context/Donate3Context';
import Footer from '../Footer/Footer';
import UserAvatar from '../UserAvatar/UserAvatar';
import styles from './SemiModal.module.css';
function SemiModal() {
  let cx = classNames.bind(styles);
  const { connect } = useWallet();
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
                connect(new PetraWallet().name);
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
