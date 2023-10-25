import classNames from 'classnames/bind';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import styles from './App.module.css';
import DonateButton from './components/DonateButton/DonateButton';
import DonorList from './components/DonorList/DonorList';
import Footer from './components/Footer/Footer';
import FormSection from './components/FormSection/FormSection';
import Header from './components/Header/Header';
import SemiModal from './components/SemiModal/SemiModal';
import UserAvatar from './components/UserAvatar/UserAvatar';
import { Donate3Context } from './context/Donate3Context';
import Close from './images/close.svg';
import { DONATE_TYPE } from './utils/const';

import { getElementPosition } from './utils/index';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [dialogStyle, setDialogStyle] = useState({});

  const {
    type,
    toAddress,
    showDonorList,
    setShowDonorList,
    showSemiModal,
    color,
    demo,
  } = React.useContext(Donate3Context);

  let cx = classNames.bind(styles);
  const handleSwitchDialog = (event: any) => {
    const defaultStyle = {
      right: 0,
      left: 0,
      top: 0,
      bottom: 0,
      margin: 'auto',
    };

    if (type === DONATE_TYPE.EMBED) {
      setDialogStyle(defaultStyle);
    } else {
      const { elementBottom, elementRight } = getElementPosition(
        event?.currentTarget,
      );
      if (window.innerWidth > 768) {
        setDialogStyle({ right: elementRight, bottom: elementBottom + 70 });
      } else {
        setDialogStyle(defaultStyle);
      }
    }
  };

  const handleShowForm = (e: any) => {
    handleSwitchDialog(e);
    setShowForm(!showForm);

    if (!showForm && !toAddress) {
      toast('unsupport chain');
    }
  };

  const renderDonate3Button = (type: DONATE_TYPE) => {
    const bgStyle = { background: color };
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
            styles.floatmode,
          )}
          onClick={handleShowForm}
          id="lxdao_donate3_button"
        >
          {showForm ? (
            <div style={bgStyle} className={styles.closewrap}>
              <img src={Close} className={styles.closeimg} />
            </div>
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
          {demo ? <div className={styles.demomask}></div> : null}
          <Header normalmode={true}></Header>
          <div onClick={handleShowForm} id="lxdao_donate3_button">
            <DonateButton></DonateButton>
          </div>

          <div
            onClick={(e) => {
              setShowDonorList(true);
              handleSwitchDialog(e);
            }}
          >
            <UserAvatar normalmode={true}></UserAvatar>
          </div>
        </div>
      );
    }
  };

  // console.log('>??>>>>>>>>>', showSemiModal);
  return (
    <>
      {type === DONATE_TYPE.EMBED && (showForm || showDonorList) ? (
        <div
          className={styles.mask}
          onClick={() => {
            setShowForm(false);
            setShowDonorList(false);
          }}
        ></div>
      ) : null}
      <div
        className={showForm ? `${styles.app} dialogSlideInUp` : styles.hidden}
        style={{ ...dialogStyle }}
      >
        {demo ? <div className={styles.demomask}></div> : null}
        <Header></Header>
        <FormSection></FormSection>
        <Footer></Footer>
        {showSemiModal ? <SemiModal></SemiModal> : null}
      </div>
      <div
        className={showDonorList ? `${styles.app} dialogZoomIn` : styles.hidden}
        style={{ ...dialogStyle }}
      >
        <DonorList />
      </div>

      {renderDonate3Button(type)}
    </>
  );
}

export default React.memo(App);
