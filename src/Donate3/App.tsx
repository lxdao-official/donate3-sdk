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
  type: string;
  color: string;
  name: string;
  address: string;
}

function App(props: Props) {
  console.log('-------App');
  const [showForm, setShowForm] = useState(false);
  const [dialogStyle, setDialogStyle] = useState({});
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

    if (props.type === '2') {
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

  const renderDonate3Button = (type: string) => {
    if (type === '1') {
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
        <div className={cx(styles.donate3btn)}>
          <Header
            address={props.address}
            name={props.name}
            type={props.type}
            normalmode={true}
          ></Header>
          <div onClick={handleSwitchDialog}>
            <DonateButton type={props.type}></DonateButton>
          </div>

          <UserAvatar type={props.type} normalmode={true}></UserAvatar>
        </div>
      );
    }
  };

  return (
    <>
      {props.type === '2' && showForm ? (
        <div
          className={styles.mask}
          onClick={() => {
            setShowForm(false);
          }}
        ></div>
      ) : null}
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
        <FormSection type={props.type} toAddress={props.address}></FormSection>
        <Footer></Footer>
      </div>
      {renderDonate3Button(props.type)}
    </>
  );
}

export default React.memo(App);
