import { useConnectModal } from '@rainbow-me/rainbowkit';
import classNames from 'classnames/bind';
import React, { useRef, useState } from 'react';
import styles from './App.module.css';
import DonateButton from './components/DonateButton/DonateButton';
import Footer from './components/Footer/Footer';
import FormSection from './components/FormSection/FormSection';
import Header from './components/Header/Header';
import UserAvatar from './components/UserAvatar/UserAvatar';
import { ReactComponent as Close } from './images/close.svg';
import { getElementPosition } from './utils/index';

export interface Props {
  type: number;
  color: string;
  name: string;
  address: string;
}

function App(props: Props) {
  const [showForm, setShowForm] = useState(false);
  const [dialogStyle, setDialogStyle] = useState({});
  const { openConnectModal } = useConnectModal();
  const dialogRef = useRef(null);
  let cx = classNames.bind(styles);
  const handleSwitchDialog = (event: any) => {
    const defaultStyle = {
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
    };

    if (props.type === 2) {
      setDialogStyle(defaultStyle);
    } else {
      const { elementBottom, elementRight } = getElementPosition(
        event?.currentTarget,
      );
      if (!showForm) {
        if (window.innerWidth > 768) {
          setDialogStyle({ right: elementRight, bottom: elementBottom + 70 });
        } else {
          setDialogStyle(defaultStyle);
        }
      }
    }

    setShowForm(!showForm);
  };

  const renderDonate3Button = (type: number) => {
    if (type === 1) {
      return (
        <div
          className={cx(
            { close: showForm },
            { floatmode: !showForm },
            styles.btn,
            styles['btn-animated'],
            styles['btn-white'],
            styles.donate3btn,
          )}
          onClick={handleSwitchDialog}
        >
          {showForm ? (
            <Close className={styles.closeimg}></Close>
          ) : (
            <>
              <DonateButton type={props.type}></DonateButton>
            </>
          )}
        </div>
      );
    } else {
      return (
        <div className={cx(styles.donate3btn)} onClick={handleSwitchDialog}>
          <Header
            address={props.address}
            name={props.name}
            type={props.type}
          ></Header>
          <DonateButton type={props.type}></DonateButton>
          <UserAvatar type={props.type}></UserAvatar>
        </div>
      );
    }
  };

  return (
    <>
      <div
        className={showForm ? `${styles.app} dialogAnimation` : styles.hidden}
        style={{ ...dialogStyle }}
        ref={dialogRef}
      >
        <Header
          address={props.address}
          name={props.name}
          type={props.type}
        ></Header>
        <FormSection></FormSection>
        <Footer></Footer>
        <button type="button" onClick={openConnectModal}>
          open x
        </button>
      </div>
      {renderDonate3Button(props.type)}
    </>
  );
}

export default App;
