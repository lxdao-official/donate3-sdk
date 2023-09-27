import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { BigNumber, ethers } from 'ethers';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Donate3Context } from '../../context/Donate3Context';
import { ReactComponent as Apt } from '../../images/apt.svg';
import { ReactComponent as Loading } from '../../images/loading.svg';
import {
  DONATE_VALUE_MAP,
  PrimaryCoinType,
  PRIMARY_COIN,
} from '../../utils/const';
import Success from '../Success/Success';
import styles from './FormSection.module.css';
interface contractMap {
  [key: number]: `0x${string}`;
}

function FormSection() {
  const [amount, setAmount] = useState('0');
  const [message, setMessage] = useState(' ');
  const [primaryCoin, setPrimaryCoin] = useState<string>('Apt');
  const [donateCreateSuccess, setDonateCreateSuccess] = useState(false);
  const { connected, account, signAndSubmitTransaction, network } = useWallet();
  const shortcutOption = useRef(null);
  const CONTRACT_MAP: contractMap = {
    1: '0x25b17e60373de2cc9a9bb80b0bab56bd0fa8203c56c7c45708770cb6caacb969::donate::donate_to_user', // Apots Mainnet
    2: '0x25b17e60373de2cc9a9bb80b0bab56bd0fa8203c56c7c45708770cb6caacb969::donate::donate_to_user', // Apots Testnet
  };

  const {
    toAddress,
    fromAddress,
    isConnected,
    setShowLoading,
    showLoading,
    color,
    chain,
  } = React.useContext(Donate3Context);
  const timeout = 5; // s

  useEffect(() => {
    if (!toAddress) {
      toast('unsupport chain');
    }
  }, [toAddress, chain]);

  useEffect(() => {
    if (toAddress === fromAddress) {
      toast('Can not donate to yourself!');
    }
  }, [toAddress, fromAddress]);

  useEffect(() => {
    const name: any = chain?.name;
    setPrimaryCoin(PRIMARY_COIN[name as keyof PrimaryCoinType]);
  }, [chain]);

  let amountIn: BigNumber | '' = 0 || '';
  if (!Number.isNaN(Number(amount))) {
    amountIn = amount && ethers.utils.parseUnits(amount.toString(), 8);
  }

  const bytesMsg = ethers.utils.toUtf8Bytes(message);
  let donateTokenArgs = [
    // pid,
    amountIn,
    toAddress,
    bytesMsg,
    [],
    {
      value: amountIn,
    },
  ];

  // const {
  //   data: transactionData,
  //   // error:writeError,
  //   writeAsync,
  // } = useContractWrite({
  //   address: CONTRACT_MAP[chain?.id || 0],
  //   abi: abi,
  //   functionName: 'donateToken',
  //   mode: 'recklesslyUnprepared',
  //   onError(error) {
  //     const errMsg = error?.reason;
  //     console.log(errMsg);
  //     if (errMsg?.includes('insufficient')) {
  //       toast(String('insufficient funds for gas'));
  //     } else if (errMsg?.includes('The donor address is equal to receive')) {
  //       toast(String('The donor address is equal to receive'));
  //     } else if (errMsg) {
  //       toast(String(errMsg));
  //     }
  //     setShowLoading(false);
  //   },
  //   onSuccess(data) {
  //     console.log('useContractWrite success', data, transactionData);
  //     setShowLoading(false);
  //     toast('Syncing data, take 1-5 minutes to show');
  //     setDonateCreateSuccess(true);
  //   },
  // });

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
      // await writeAsync?.({
      //   recklesslySetUnpreparedArgs: donateTokenArgs,
      // });
      signAndSubmitTransaction({
        type: 'entry_function_payload',
        function: CONTRACT_MAP[parseInt(network?.chainId ?? '2')],
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
        arguments: ['', amountIn.toString(), toAddress, message],
      }).then((data: string) => {
        if (!data) {
          toast(String('Cancel'));
          return;
        }
        console.log('useContractWrite success', data);
        setShowLoading(false);
        toast('Syncing data, take 1-5 minutes to show');
        setDonateCreateSuccess(true);
      });
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

  const handleManualAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAmount(event.target.value);
  };

  const handleManualAmountFocus = () => {
    shortcutOption?.current?.childNodes?.forEach((item) => {
      item.classList.remove(styles.active);
    });
  };

  const donateVal = DONATE_VALUE_MAP[chain?.name as keyof PrimaryCoinType] || [
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
              <Apt />
              <span>{primaryCoin}</span>
              <span>{chain?.name}</span>
            </div>
            {/* <div className={styles.switch}>
              <Switch />
            </div> */}
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
