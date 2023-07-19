import { useChainModal } from '@rainbow-me/rainbowkit';
import { BigNumber, ethers } from 'ethers';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useContractWrite } from 'wagmi';
import abi from '../../abi.json';
import { Donate3Context } from '../../context/Donate3Context';
import { useCreateDonate } from '../../hooks/useDonate';
import { ReactComponent as Eth } from '../../images/eth.svg';
import { ReactComponent as Loading } from '../../images/loading.svg';
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
  const createDonate = useCreateDonate();
  const shortcutOption = useRef(null);
  const CONTRACT_MAP: contractMap = {
    5: '0x888702fa547Ba124f8d8440a4DB95A6ddA81A737',
    80001: '0xac511F51C3a89639072144aB539192eca267F823',
    137: '0x0049c7684a551e581D8de08fD2827dFF9808d162'
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
    amountIn = amount && ethers.utils.parseEther(amount.toString());
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

  // console.log('合约参数:', donateTokenArgs);

  const asyncFunc = async (transactionData: any) => {
    const createDonateArgs = {
      chainType: chain?.id || 0,
      coinType: 0, //TODO, 这里我应该传什么？有哪些值？
      fromAddress: fromAddress,
      userId: fromAddress,
      hash: transactionData?.hash, // 这里我取 transaction hash
      // id: transactionData?.hash, // 这里的 id 我也暂时取了 hash，因为 hash 是唯一的
      message: message,
      // status: 0, // TODO 这里的状态有哪些值？
      toAddress: toAddress,
      usdValue: parseInt(amount).toFixed(1), // 这里是否可以支持 int 和 string 两种类型？
      value: parseInt(amount).toFixed(1), // 这里是否可以支持 int 和 string 两种类型？
    };
    const result = await createDonate(createDonateArgs);
    setDonateCreateSuccess(true);
    console.log(result);
  };

  const {
    data: transactionData,
    // error:writeError,
    writeAsync,
  } = useContractWrite({
    address: CONTRACT_MAP[chain?.id || 0],
    abi: abi,
    functionName: 'donateToken',
    mode: 'recklesslyUnprepared',
    onError(error) {
      const errMsg = error?.reason;
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
      asyncFunc(data);
    },
  });

  useEffect(() => {
    if (isConnected) {
      setShowLoading(false);
    }
  }, [isConnected]);

  useEffect(() => {
    if (donateCreateSuccess) {
      setTimeout(() => {
        setDonateCreateSuccess(false);
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
        recklesslySetUnpreparedArgs: donateTokenArgs,
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
              {primaryCoin === 'ETH' ? <Eth /> : <Polygon />}
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
          disabled={!writeAsync}
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
