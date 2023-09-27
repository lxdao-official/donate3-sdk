import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js';

import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Donate3Context } from '../../context/Donate3Context';
import { ReactComponent as Loading } from '../../images/loading.svg';
import { ReactComponent as Sol } from '../../images/sol.svg';
import { ReactComponent as Switch } from '../../images/switch.svg';
import Success from '../Success/Success';
import styles from './FormSection.module.css';

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
    console.log('handleDonate', isConnected, showLoading);

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
      const destAddress = new PublicKey(
        'FrmjU1XPp5cPeJSabTAYSffg4VBv98D2wpkKar9Y8tNF',
      );
      const amount = 1_000_000;

      console.log(amount);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: destAddress,
          lamports: amount,
        }),
      );
      toast(
        `handleDonate: ${publicKey.toBase58()} to ${destAddress.toBase58()} amount: ${amount}`,
      );
      signature = await sendTransaction(transaction, connection);

      await connection.confirmTransaction(signature, 'confirmed');
      toast(`Transaction confirmed: ${signature}`);
      // console.log('success', `Transaction success!`, signature);
      setShowLoading(false);
    } catch (error: any) {
      // console.log('error', `Transaction failed! ${error?.message}`, signature);
      toast(`Transaction failed! ${error?.message}`);
      return;
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

  const donateVal = [0.001, 0.01, 0.5];

  return (
    <>
      {/* <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div> */}
      <section className={styles.appcontent}>
        <div>
          <div className={styles.title}>Payment Method</div>
          <div className={styles.methodinput}>
            <div className={styles.cointxt}>
              <Sol width={28} height={28} />
              <span>{primaryCoin}</span>
              <span>Solana</span>
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

export default React.memo(FormSection);
