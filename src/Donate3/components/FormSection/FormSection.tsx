import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';
import styles from './FormSection.module.css';

function FormSection(props: any) {
  return (
    <section className={styles.appcontent}>
      <div className={styles.title}>Payment Method</div>
      <div className={styles.methodinput}>
        <div>images</div>
        <div>ETH</div>
        <input placeholder="Ethereum"></input>
        <div>切换</div>
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
      <fieldset>
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
      <div className={styles.donate3btn}>
        <div>DONATE3</div>
        <div>≈$875.32</div>
        <ConnectButton
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
        />
      </div>
    </section>
  );
}

//

export default FormSection;
