import classNames from 'classnames/bind';
import React, { useState } from 'react';
import styles from './App.module.css';
import DonateButton from './components/DonateButton/DonateButton';
import DonorList from './components/DonorList/DonorList';
import Footer from './components/Footer/Footer';
import FormSection from './components/FormSection/FormSection';
import Header from './components/Header/Header';
import UserAvatar from './components/UserAvatar/UserAvatar';
import { Donate3Context } from './context/Donate3Context';
import { ReactComponent as Close } from './images/close.svg';
import { DONATE_TYPE } from './utils/const';

import { getElementPosition } from './utils/index';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [dialogStyle, setDialogStyle] = useState({});
  const [showDonorList, setShowDonorList] = useState(false);
  const { type } = React.useContext(Donate3Context);

  let cx = classNames.bind(styles);
  const handleSwitchDialog = (event: any) => {
    const defaultStyle = {
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
    };

    if (type === DONATE_TYPE.NORMAL) {
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
    if (type === DONATE_TYPE.FLOAT) {
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
              <DonateButton></DonateButton>
            </>
          )}
        </div>
      );
    } else {
      return (
        <div className={cx(styles.donate3btn)}>
          <Header
            setShowDonorList={setShowDonorList}
            normalmode={true}
          ></Header>
          <div onClick={handleSwitchDialog}>
            <DonateButton></DonateButton>
          </div>

          <div
            onClick={() => {
              setShowDonorList(true);
            }}
          >
            <UserAvatar normalmode={true}></UserAvatar>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {type === DONATE_TYPE.NORMAL && (showForm || showDonorList) ? (
        <div
          className={styles.mask}
          onClick={() => {
            setShowForm(false);
            setShowDonorList(false);
          }}
        ></div>
      ) : null}
      <div
        className={showForm ? `${styles.app} dialogAnimation` : styles.hidden}
        style={{ ...dialogStyle }}
      >
        <Header setShowDonorList={setShowDonorList}></Header>
        <FormSection></FormSection>
        <Footer></Footer>
      </div>
      <div
        className={
          showDonorList ? `${styles.app} dialogAnimation` : styles.hidden
        }
        style={{ ...dialogStyle }}
      >
        <DonorList setShowDonorList={setShowDonorList} />
      </div>

      {renderDonate3Button(type)}
    </>
  );
}

export default React.memo(App);
