import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import styles from "./FormSection.module.css";

export interface FormSectionProps {}

function FormSection(props: FormSectionProps) {
  return (
    <section className={styles.AppContent}>
      <div className={styles.Title}>Payment Method</div>
      <div className={styles.MethodInput}>
        <div>images</div>
        <div>ETH</div>
        <input placeholder="Ethereum"></input>
        <div>切换</div>
      </div>
      <div className={styles.FooterMark}>
        <div>icon</div>
        <div>21.11ETH</div>
        <div>0.01E = $127; 31GWEI = $0.75</div>
      </div>
      <div className={styles.ShortcutOption}>
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
        className={styles.PriceBtn}
        placeholder="Enter Price Manually"
      ></input>
      <div className={styles.Msg}>
        <div>Message</div>
        <input placeholder="Will be published on chain" multiple></input>
      </div>
      <div className={styles.Donate3Btn}>
        <div>DONATE3</div>
        <div>≈$875.32</div>
        <ConnectButton
          label="Sign in"
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
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
