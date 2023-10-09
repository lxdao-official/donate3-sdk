import React, { useEffect, useState } from 'react';
import { ReactComponent as SuccessImg } from '../../images/success.svg';
import Footer from '../Footer/Footer';
import styles from './Success.module.css';
import { Donate3Context } from '../../context/Donate3Context';

function Success(props: { timeout: number; setDonateCreateSuccess: any }) {
  const [time, setTime] = useState(props.timeout);
  const {
    color,
  } = React.useContext(Donate3Context);
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
      <div className={styles.txt}>Thank you for your donation. Love you~</div>
      <div className={styles.footer}>
        <button
          style={{ backgroundColor: color }}
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
