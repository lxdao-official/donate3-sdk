import React from "react";
import avatar from "./images/avatar.svg";
import logo from "./images/logo.svg";
import {
  ConnectButton,
  useConnectModal,
  useAccountModal,
  useChainModal,
  useAddRecentTransaction,
} from "@rainbow-me/rainbowkit";
import useNouns from "./hooks/useNouns";
import styles from "./App.module.css";

export interface Props {
  type: number;
  color: string;
  name: string;
  address: string;
}

function App(props: Props) {
  const addRecentTransaction = useAddRecentTransaction();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const base64Hash = useNouns(props.address);
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <div className={styles.AppHeaderRecipientInfo}>
          <div>Donate to {props.name}</div>
          <div>To:{props.address}</div>
        </div>
        <div>
          {base64Hash ? (
            <img
              className={styles.AppHeaderAvatar}
              alt="avatar"
              src={`data:image/svg+xml;base64,${base64Hash}`}
            />
          ) : (
            <img src={avatar} className={styles.AppHeaderAvatar} alt="avatar" />
          )}
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
      <footer className={styles.AppFooter}>
        <span>Power by</span>
        <span>
          <img src={logo} alt="logo"></img>
        </span>
        <span>Donate3</span>
      </footer>
      <button
        onClick={() => {
          addRecentTransaction({
            hash: "0x...",
            description: "...",
          });
        }}
      >
        Add recent transaction
      </button>
      {openConnectModal && (
        <button onClick={openConnectModal} type="button">
          Open Connect Modal
        </button>
      )}

      {openAccountModal && (
        <button onClick={openAccountModal} type="button">
          Open Account Modal
        </button>
      )}

      {openChainModal && (
        <button onClick={openChainModal} type="button">
          Open Chain Modal
        </button>
      )}
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button onClick={openConnectModal} type="button">
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button">
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      onClick={openChainModal}
                      style={{ display: "flex", alignItems: "center" }}
                      type="button"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 12,
                            height: 12,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              style={{ width: 12, height: 12 }}
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                    </button>

                    <button onClick={openAccountModal} type="button">
                      {account.displayName}
                      {account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}

//

export default App;
