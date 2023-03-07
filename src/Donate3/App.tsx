import {
  ConnectButton,
  useAccountModal,
  useAddRecentTransaction,
  useChainModal,
  useConnectModal,
} from '@rainbow-me/rainbowkit';
import React, { useState } from 'react';
import styles from './App.module.css';
import FormSection from './components/FormSection/FormSection';
import Header from './components/Header/Header';
import close from './images/close.svg';
import logo from './images/logo.svg';
import logowhite from './images/logowhite.svg';

export interface Props {
  type: number;
  color: string;
  name: string;
  address: string;
}

const getElementPosition = (element: HTMLDivElement) => {
  const rect = element.getBoundingClientRect(); // 获取元素的位置信息
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop; // 获取当前滚动条的位置
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  const elementTop = rect.top + scrollTop; // 元素相对于屏幕顶部的位置
  const elementLeft = rect.left + scrollLeft; // 元素相对于屏幕左侧的位置

  console.log(`元素相对于屏幕顶部的位置：${elementTop}`);
  console.log(`元素相对于屏幕左侧的位置：${elementLeft}`);
  return { elementTop: rect.top, elementLeft: rect.left };
};

function App(props: Props) {
  const addRecentTransaction = useAddRecentTransaction();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { openChainModal } = useChainModal();
  const [showForm, setShowForm] = useState(false);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  return (
    <>
      {showForm ? (
        <div className={styles.app} style={{ left, top }}>
          <Header address={props.address} name={props.name}></Header>
          <FormSection></FormSection>
          <footer className={styles.appfooter}>
            <span>Power by</span>
            <span>
              <img src={logo} alt="logo"></img>
            </span>
            <span>Donate3</span>
          </footer>
          <div
            className={styles.close}
            onClick={() => {
              setShowForm(!showForm);
            }}
          >
            <img
              className={styles.closeimg}
              src={close}
              alt="donate close"
            ></img>
          </div>
          <button
            type="button"
            onClick={() => {
              addRecentTransaction({
                hash: '0x...',
                description: '...',
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
              const ready = mounted && authenticationStatus !== 'loading';
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === 'authenticated');

              return (
                <div
                  {...(!ready && {
                    'aria-hidden': true,
                    style: {
                      opacity: 0,
                      pointerEvents: 'none',
                      userSelect: 'none',
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
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button
                          onClick={openChainModal}
                          style={{ display: 'flex', alignItems: 'center' }}
                          type="button"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 12,
                                height: 12,
                                borderRadius: 999,
                                overflow: 'hidden',
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain icon'}
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
                            : ''}
                        </button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      ) : (
        <div
          className={styles.tinymode}
          onClick={(event) => {
            const { elementTop, elementLeft } = getElementPosition(
              event?.currentTarget,
            );

            setLeft(elementLeft - 426);
            setTop(elementTop - 668);

            setShowForm(!showForm);
          }}
        >
          <img className={styles.tinyimg} src={logowhite} alt="Donate3 Logo" />
          <span className={styles.tinytxt}>Donate3</span>
        </div>
      )}
    </>
  );
}

//

export default App;
