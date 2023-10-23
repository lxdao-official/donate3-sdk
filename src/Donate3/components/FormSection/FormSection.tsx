import { useChainModal } from '@rainbow-me/rainbowkit';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { parseEther, stringToHex } from 'viem';
import { useContractWrite } from 'wagmi';
import abi from '../../abi.json';
import { Donate3Context } from '../../context/Donate3Context';
import { ReactComponent as Arbitrum } from '../../images/arb.svg';
import { ReactComponent as Eth } from '../../images/eth.svg';
import { ReactComponent as Linea } from '../../images/linea.svg';
import { ReactComponent as Loading } from '../../images/loading.svg';
import { ReactComponent as Optimism } from '../../images/op.svg';
import { ReactComponent as Polygon } from '../../images/polygon.svg';
import { ReactComponent as Switch } from '../../images/switch.svg';
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
  const { openChainModal } = useChainModal();
  const [amount, setAmount] = useState('0');
  const [message, setMessage] = useState(' ');
  const [primaryCoin, setPrimaryCoin] = useState<string>('ETH');
  const [donateCreateSuccess, setDonateCreateSuccess] = useState(false);
  const shortcutOption = useRef(null);
  const CONTRACT_MAP: contractMap = {
    // 5: '0x888702fa547Ba124f8d8440a4DB95A6ddA81A737',
    // 80001: '0xac511F51C3a89639072144aB539192eca267F823',
    // 137: '0x0049c7684a551e581D8de08fD2827dFF9808d162',
    1: '0x3a42DDc676F6854730151750f3dBD0ebFE3c6CD3', // ETH
    5: '0xc12abd5F6084fC9Bdf3e99470559A80B06783c40', // goerli
    10: '0x0049c7684a551e581D8de08fD2827dFF9808d162', // optimism
    42161: '0x0049c7684a551e581D8de08fD2827dFF9808d162', // arb one
    59144: '0x3a42ddc676f6854730151750f3dbd0ebfe3c6cd3', // linea
    137: '0x0049c7684a551e581D8de08fD2827dFF9808d162', // polygon
    80001: '0xc12abd5F6084fC9Bdf3e99470559A80B06783c40', // mubai
    11155111: '0x1D9021fbE80a7Ce13897B5757b25296d62dDe698', // sepolia
    420: '0x39fF8a675ffBAfc177a7C54556b815163521a8B7',
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

  let amountIn: bigint = BigInt(0);
  if (!Number.isNaN(Number(amount))) {
    amountIn = (amount && parseEther(amount.toString())) || BigInt(0);
  }

  const bytesMsg = stringToHex(message);

  const {
    data: transactionData,
    // error:writeError,
    writeAsync,
  } = useContractWrite({
    address: CONTRACT_MAP[chain?.id || 0],
    abi: abi,
    functionName: 'donateToken',
    onError(error) {
      const errMsg = error.name;
      console.log(errMsg);
      if (errMsg?.includes('insufficient')) {
        toast(String('insufficient funds for gas'));
      } else if (errMsg?.includes('The donor address is equal to receive')) {
        toast(String('The donor address is equal to receive'));
      } else if (errMsg) {
        toast(String(errMsg));
      }
      setShowLoading(false);
    },
    onSuccess(data) {
      console.log('useContractWrite success', data, transactionData);
      setShowLoading(false);
      toast('Syncing data, take 1-5 minutes to show');
      setDonateCreateSuccess(true);
    },
  });

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

      await writeAsync?.({
        args: [amountIn, toAddress, bytesMsg, []],
        value: amountIn,
      });
      console.log(transactionData);
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
          <div className={styles.methodinput} onClick={openChainModal}>
            <div className={styles.cointxt}>
              {/* {primaryCoin === 'ETH' ? <Eth /> : <Polygon />} */}
              {(chain?.id as number) === 1 && <Eth />}
              {(chain?.id as number) === 10 && <Optimism />}
              {(chain?.id as number) === 59144 && <Linea />}
              {(chain?.id as number) === 137 && <Polygon />}
              {(chain?.id as number) === 42161 && <Arbitrum />}
              {(chain?.id as number) === 5 && <Eth />}
              {(chain?.id as number) === 80001 && <Polygon />}
              {(chain?.id as number) === 11155111 && <Eth />}
              {(chain?.id as number) === 420 && <Optimism />}

              <span>{primaryCoin}</span>
              <span>{chain?.name}</span>
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
          disabled={!writeAsync || !toAddress}
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
