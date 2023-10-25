import React, { useEffect, useState } from 'react';
import SuccessImg from '../../images/success.svg';
import Footer from '../Footer/Footer';
import styles from './Success.module.css';
import { coinType } from '../../utils/const';
import { useNetwork } from 'wagmi';

function Success(props: { timeout: number; setDonateCreateSuccess: any, transactionHash: string }) {
  const [time, setTime] = useState(props.timeout);
  const { chain } = useNetwork();
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


  const handleClickTransactionHash = () => {
    const hrefUrl = coinType[chain?.id + ""]?.coin[0].explorer + props.transactionHash;
    window.open(hrefUrl, "_blank");
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.img}>
        <img src={SuccessImg} />
      </div>
      {props?.transactionHash ? <div>Transaction Hash:<span className={styles.hashTxt} onClick={handleClickTransactionHash}>{props?.transactionHash.slice(0, 5) + '...' + props?.transactionHash.slice(-5, -1)}</span></div> : <></>}
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
