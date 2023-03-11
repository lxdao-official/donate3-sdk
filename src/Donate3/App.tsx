import classNames from 'classnames/bind';
import React, { useRef, useState } from 'react';
import styles from './App.module.css';
import Footer from './components/Footer/Footer';
import FormSection from './components/FormSection/FormSection';
// import Header from './components/Header/Header';
import { ReactComponent as Close } from './images/close.svg';
import { ReactComponent as LogoWhite } from './images/logowhite.svg';
import { getElementPosition } from './utils/index';

export interface Props {
  type: number;
  color: string;
  name: string;
  address: string;
}

function App(props: Props) {
  const [showForm, setShowForm] = useState(false);
  const [bottom, setTottom] = useState(0);
  const [right, setRright] = useState(0);
  const [mobileStyle, setMobileStyle] = useState({});
  const dialogRef = useRef(null);
  let cx = classNames.bind(styles);

  return (
    <>
      <div
        className={showForm ? `${styles.app} dialogAnimation` : styles.hidden}
        style={{ ...mobileStyle, bottom, right }}
        ref={dialogRef}
      >
        {/* <Header address={props.address} name={props.name}></Header> */}
        <FormSection></FormSection>
        <Footer></Footer>
      </div>
      <div
        className={cx(
          { close: showForm },
          { tinymode: !showForm },
          styles.btn,
          styles['btn-animated'],
          styles['btn-white'],
        )}
        onClick={(event) => {
          let right, bottom;
          const { elementBottom, elementRight } = getElementPosition(
            event?.currentTarget,
          );
          if (!showForm) {
            if (window.innerWidth > 768) {
              right = elementRight;
              bottom = elementBottom + 70;
              setMobileStyle({});
            } else {
              right = 0;
              bottom = 0;
              setMobileStyle({
                right: 0,
                left: 0,
                top: 0,
                botton: 0,
                margin: 'auto',
              });
            }
            setRright(right);
            setTottom(bottom);
          }
          setShowForm(!showForm);
        }}
      >
        {showForm ? (
          <Close className={styles.closeimg}></Close>
        ) : (
          <>
            <LogoWhite className={styles.tinyimg}></LogoWhite>
            <span className={styles.tinytxt}>Donate3</span>
          </>
        )}
      </div>
    </>
  );
}

export default App;
