import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { ReactComponent as SemiLogo } from '../../images/semilogo.svg';
import Footer from '../Footer/Footer';
import styles from './FormSection.module.css';

function FormSection(props: any) {
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { connector: activeConnector, isConnected } = useAccount();
  const [showSemiModal, setShowSemiModal] = useState(false);
  let cx = classNames.bind(styles);

  const handleDonate = (event: any) => {
    console.log('handleDonate', event, isConnected);
    if (isConnected) {
      setShowSemiModal(false);
      // TODO 调用合约
    } else {
      setShowSemiModal(true);
    }
  };

  const makeDonateUserAvatar = () => {
    let dom = [];
    const url = 'https://i.imgur.com/RbcuN95.jpeg';
    const myStyle = {
      backgroundImage: `url('${url}')`,
      height: '30px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    };
    dom = ['aa', 'bb', 'cc'].map((item) => (
      <div key={item} className={styles.donateuseravatar} style={myStyle}></div>
    ));
    dom.push(
      <div key={'lastitem'} className={styles.donateuseravatar}>
        190
      </div>,
    );
    return dom;
  };
  return (
    <section className={styles.appcontent}>
      <div className={styles.title}>Payment Method</div>
      <div className={styles.methodinput}>
        <div>images</div>
        <div>ETH</div>
        <input placeholder="Ethereum"></input>
        <div onClick={openChainModal}>切换</div>
      </div>
      <div className={styles.footermark}>
        <div>icon</div>
        <div>21.11ETH</div>
        <div>0.01E = $127; 31GWEI = $0.75</div>
      </div>
      <div className={styles.shortcutoption}>
        <div>0.001 ETH</div>
        <div>0.001 ETH</div>
        <div>0.001 ETH</div>
      </div>
      <fieldset className={styles.fieldset}>
        <legend>
          <span>OR</span>
        </legend>
      </fieldset>
      <input
        className={styles.pricebtn}
        placeholder="Enter Price Manually"
      ></input>
      <div className={styles.msg}>
        <div>Message</div>
        <input placeholder="Will be published on chain" multiple></input>
      </div>

      <div className={styles.donate3btn} onClick={handleDonate}>
        <div>DONATE3</div>
        <div>≈$875.32</div>
        {/* <ConnectButton
          label="Sign in"
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
          chainStatus="none"
          showBalance={{
            smallScreen: false,
            largeScreen: true,
          }}
        />*/}
      </div>
      <div
        className={cx(
          styles.semiModal,
          { in: !isConnected || showSemiModal },
          { out: isConnected || !showSemiModal },
        )}
      >
        <div
          className={styles.bgmask}
          onClick={() => {
            setShowSemiModal(false);
          }}
        ></div>
        <div className={styles.semiwrap}>
          <div className={styles.semilogo}>
            <SemiLogo></SemiLogo>
          </div>
          <div>
            <div className={styles.donateusers}>{makeDonateUserAvatar()}</div>
            <div className={styles.donateuserdec}>已有198人向他捐赠</div>
          </div>
          <div className={styles.semidonatebtn} onClick={openConnectModal}>
            Connect wallet for donation
          </div>
          <Footer></Footer>
        </div>
      </div>
    </section>
  );
}

//

export default FormSection;
