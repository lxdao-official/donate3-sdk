import React, { useEffect, useState } from 'react';
import { ReactComponent as SuccessImg } from '../../images/success.svg';
import Footer from '../Footer/Footer';
import styles from './Success.module.css';

function Success(props: { timeout: number; setDonateCreateSuccess: any, toAddress: `0x${string}` }) {
  const [time, setTime] = useState(props.timeout);
  useEffect(() => {
    const myIterval = setInterval(() => {
      if (time === 0) {
        clearInterval(myIterval);
      } else {
        setTime((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => {
      clearInterval(myIterval);
    };
  }, [props.timeout]);

  return (
    <div className={styles.wrap}>
      <div className={styles.img}>
        <SuccessImg></SuccessImg>
      </div>
      {props?.toAddress ? <div className={styles.txt}>Donate To:{props?.toAddress.slice(0, 5) + '...' + props?.toAddress.slice(-5, -1)}</div> : <></>}
      <div className={styles.txt}>Thank you for your donation. Love you~</div>
      <div className={styles.footer}>
        <button
          className={styles.btn}
          type="button"
          onClick={() => {
            props.setDonateCreateSuccess(false);
          }}
        >
          Close {time} s
        </button>
        <Footer />
      </div>
    </div>
  );
}

//

export default React.memo(Success);
