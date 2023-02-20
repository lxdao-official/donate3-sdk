import React from "react";
import avatar from "./images/avatar.svg";
import logo from "./images/logo.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./App.module.css";

function App() {
  const recipientName = "Recipient Name";
  const recipientAddress = "0xF7129631f...e341e2161C4";
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <div className={styles.AppHeaderRecipientInfo}>
          <div>Donate to {recipientName}</div>
          <div>To:{recipientAddress}</div>
        </div>
        <div>
          <img src={avatar} className="App-avatar" alt="avatar" />
        </div>
      </header>
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
          <ConnectButton />
        </div>
      </section>
      <footer className={styles.AppFooter}>
        <span>Power by</span>
        <span>
          <img src={logo} alt="logo"></img>
        </span>
        <span>Donate3</span>
      </footer>
    </div>
  );
}

//

export default App;
