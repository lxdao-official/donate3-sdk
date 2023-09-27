import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionSignature } from '@solana/web3.js';

import React,{ MouseEvent,useEffect,useRef,useState,useCallback } from 'react';
import toast,{ Toaster } from 'react-hot-toast';
import { Donate3Context } from '../../context/Donate3Context';
import { ReactComponent as Loading } from '../../images/loading.svg';
import { ReactComponent as Switch } from '../../images/switch.svg';
import Success from '../Success/Success';
import styles from './FormSection.module.css';
import { SPL_DONATE_TOKEN_ID } from '../../utils/const';

function FormSection() {
  const [amount, setAmount] = useState('0');
  const [message, setMessage] = useState(' ');
  const [donateCreateSuccess, setDonateCreateSuccess] = useState(false);
  const shortcutOption = useRef(null);

  const primaryCoin = 'SOL';
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const {
    toAddress,
    fromAddress,
    isConnected,
    setShowLoading,
    showLoading,
    color,
  } = React.useContext(Donate3Context);
  const timeout = 5; // s

  useEffect(() => {
    if (!toAddress) {
      toast('unsupport chain');
    }
  }, [toAddress]);

  useEffect(() => {
    if (toAddress === fromAddress) {
      toast('Can not donate to yourself!');
    }
  }, [toAddress, fromAddress]);

  // let amountIn: '';
  // if (!Number.isNaN(Number(amount))) {
  //   amountIn = amount && ethers.utils.parseEther(amount.toString());
  // }

  // const bytesMsg = ethers.utils.toUtf8Bytes(message);
  // let donateTokenArgs = [
  //   // pid,
  //   amountIn,
  //   toAddress,
  //   bytesMsg,
  //   [],
  //   {
  //     value: amountIn,
  //   },
  // ];

  useEffect(() => {
    if (isConnected) {
      setShowLoading(false);
    }
  }, [isConnected]);

  const onSuccessModalClose = () => {
    setAmount('0');
    setMessage('');
  };

  useEffect(() => {
    if (donateCreateSuccess) {
      setTimeout(() => {
        setDonateCreateSuccess(false);
        onSuccessModalClose();
      }, timeout * 1000);
    }
  }, [donateCreateSuccess]);

  const handleDonate = async () => {
    if (isConnected) {
      if (showLoading) {
        return;
      }
      setShowLoading(true);

      if (!publicKey) {
        console.log('error', `Send Transaction: Wallet not connected!`);
        return;
      }

      // const pubKey = new PublicKey("7BzGMomgbswT6ynUmbkqA2mh2h9oGNgfKwfR2GrEmvRT");
      let signature: TransactionSignature = '';
      try {
          const destAddress = new PublicKey(toAddress!);
          const amount = 1_000_000;

          console.log(amount);

          const transaction = new Transaction().add(
              SystemProgram.transfer({
                  fromPubkey: publicKey,
                  toPubkey: destAddress,
                  lamports: amount,
              })
          );

          signature = await sendTransaction(transaction, connection);

          await connection.confirmTransaction(signature, 'confirmed');
          console.log('success', `Transaction success!`, signature);
      } catch (error: any) {
          console.log('error', `Transaction failed! ${error?.message}`, signature);
          return;
      }
      
    } else {
      toast('Please connect wallet first!');
    }
  };

  const handleEthAmount = (event: MouseEvent<HTMLElement>) => {
    event.currentTarget.querySelectorAll('div').forEach((item: any) => {
      item.classList.remove(styles.active);
    });
    // @ts-ignore
    const amount = event.target?.dataset?.amount || 0;
    (event.target as HTMLElement).classList.add(styles.active);
    setAmount(amount);
  };

  const handleManualAmountFocus = () => {
    shortcutOption?.current?.childNodes?.forEach((item) => {
      item.classList.remove(styles.active);
    });
  };

  const handleManualAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAmount(event.target.value);
  };

  const donateVal = [
    0.001, 0.01, 0.5,
  ];

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <section className={styles.appcontent}>
        <div>
          <div className={styles.title}>Payment Method</div>
          <div className={styles.methodinput}>
            <div className={styles.cointxt}>
              <span>{primaryCoin}</span>
              <span>SOLANA</span>
            </div>
            <div className={styles.switch}>
              <Switch />
            </div>
          </div>
        </div>
        <div
          className={styles.shortcutoption}
          ref={shortcutOption}
          onClick={handleEthAmount}
        >
          <div data-amount={donateVal[0]}>
            {donateVal[0]} {primaryCoin}
          </div>
          <div data-amount={donateVal[1]}>
            {donateVal[1]} {primaryCoin}
          </div>
          <div data-amount={donateVal[2]}>
            {donateVal[2]} {primaryCoin}
          </div>
        </div>
        <fieldset className={styles.fieldset}>
          <legend>
            <span>OR</span>
          </legend>
        </fieldset>
        <input
          className={styles.pricebtn}
          placeholder="Enter Price Manually"
          value={amount}
          type="number"
          onFocus={handleManualAmountFocus}
          onChange={handleManualAmountChange}
        ></input>
        <div className={styles.msg}>
          <div>Message</div>
          <textarea
            placeholder="Will be published on chain"
            value={message}
            onChange={(e) => {
              setMessage(e.currentTarget.value);
            }}
          ></textarea>
        </div>
        <button
          type="button"
          className={styles.donate3btn}
          style={{ background: color }}
          disabled={!toAddress}
          onClick={handleDonate}
        >
          {showLoading ? <Loading></Loading> : null}
          {showLoading ? <div>Confirm in wallet...</div> : <div>DONATE</div>}
        </button>
        {donateCreateSuccess ? (
          <Success
            timeout={timeout}
            setDonateCreateSuccess={setDonateCreateSuccess}
          />
        ) : null}
      </section>
    </>
  );
}

//

export default React.memo(FormSection);
