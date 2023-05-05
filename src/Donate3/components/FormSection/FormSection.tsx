import { useChainModal } from '@rainbow-me/rainbowkit';
import { BigNumber, ethers } from 'ethers';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import abi from '../../abi.json';
import { Donate3Context } from '../../context/Donate3Context';
import { useCreateDonate } from '../../hooks/useDonate';
import { ReactComponent as Eth } from '../../images/eth.svg';
import { ReactComponent as Loading } from '../../images/loading.svg';
import { ReactComponent as Switch } from '../../images/switch.svg';
import {
  DONATE_VALUE_MAP,
  PrimaryCoinType,
  PRIMARY_COIN,
} from '../../utils/const';
import Success from '../Success/Success';
import styles from './FormSection.module.css';

function FormSection() {
  const { openChainModal } = useChainModal();
  const [amount, setAmount] = useState('0');
  const [message, setMessage] = useState('');
  const [primaryCoin, setPrimaryCoin] = useState<string>('ETH');
  const [donateCreateSuccess, setDonateCreateSuccess] = useState(false);
  const createDonate = useCreateDonate();
  const shortcutOption = useRef(null);

  const {
    toAddress,
    fromAddress,
    setShowSemiModal,
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

  let pid = 3;
  // let _merkleProof = '';
  // const amountIn = new BigNumber(amount * Math.pow(10, 18));
  let amountIn: BigNumber | '' = 0 || '';
  if (!Number.isNaN(Number(amount))) {
    amountIn = amount && ethers.utils.parseEther(amount.toString());
  }

  const bytesMsg = ethers.utils.toUtf8Bytes(message);
  let donateTokenArgs = [
    pid,
    amountIn,
    toAddress,
    // '0xb86EB6f8a39Db243a9ae544F180ef958dBA4e8b4',
    bytesMsg,
    [],
    {
      value: amountIn,
    },
  ];

  console.log('合约参数:', donateTokenArgs);

  const asyncFunc = async (transactionData: any) => {
    const createDonateArgs = {
      chainType: 4 || chain?.id || 0,
      coinType: 0, //TODO, 这里我应该传什么？有哪些值？
      fromAddress: fromAddress,
      userId: fromAddress,
      hash: transactionData?.hash, // 这里我取 transaction hash
      // id: transactionData?.hash, // 这里的 id 我也暂时取了 hash，因为 hash 是唯一的
      message: message,
      // status: 0, // TODO 这里的状态有哪些值？
      toAddress: toAddress,
      usdValue: String(amount), // 这里是否可以支持 int 和 string 两种类型？
      value: String(amount), // 这里是否可以支持 int 和 string 两种类型？
    };
    const result = await createDonate(createDonateArgs);
    setDonateCreateSuccess(true);
    console.log(result);
  };

  const { config, error: prepareError } = usePrepareContractWrite({
    address: '0xbdEA24f8657eC8AD679b8bCcc761EcEE9600667e',
    abi: abi,
    functionName: 'donateToken',
    args: donateTokenArgs,
  });

  const {
    data: transactionData,
    isSuccess,
    isError,
    write,
  } = useContractWrite({
    ...config,
    onError(error) {
      setShowLoading(false);
      toast(String(error));
    },
    onSuccess(data) {
      setShowLoading(false);
      toast('正在同步数据，需要 1-5 分钟展示');
      asyncFunc(transactionData);
    },
  });

  // console.log(
  //   '合约数据变更',
  //   transactionData,
  //   isSuccess,
  //   isError,
  //   write,
  //   prepareError,
  // );

  useEffect(() => {
    if (isConnected) {
      setShowSemiModal(false);
      setShowLoading(false);
    } else {
      setShowSemiModal(true);
    }
  }, [isConnected]);

  useEffect(() => {
    if (prepareError) {
      toast(String(prepareError?.reason || prepareError?.data?.message));
    }
  }, [prepareError]);

  useEffect(() => {
    if (donateCreateSuccess) {
      setTimeout(() => {
        setDonateCreateSuccess(false);
      }, timeout * 1000);
    }
  }, [donateCreateSuccess]);

  // useEffect(() => {
  //   if (isSuccess) {

  //   }
  // }, [isSuccess, isError]);

  // useEffect(() => {
  //   if (isIdle) {
  //     setShowLoading(false);
  //   }
  // }, [isIdle]);

  const handleDonate = async () => {
    if (isConnected) {
      setShowSemiModal(false);
      setShowLoading(true);
      write?.();
      console.log(transactionData);
    } else {
      setShowSemiModal(true);
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
    // console.log(Number.isNaN(Number(event.target.value)));
    // if (!Number.isNaN(Number(event.target.value))) {
    // setAmount(Number(event.target.value));
    // }
    setAmount(event.target.value);
  };

  const handleManualAmountFocus = () => {
    shortcutOption?.current?.childNodes?.forEach((item) => {
      item.classList.remove(styles.active);
    });
    // setAmount(0);
  };

  const [donateVal1, donateVal2, donateVal3] =
    DONATE_VALUE_MAP[chain?.name as keyof PrimaryCoinType];

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
              <Eth />
              <span>{primaryCoin}</span>
              <span>{chain?.name}</span>
            </div>
            <div className={styles.switch}>
              <Switch />
            </div>
          </div>
          {/* <div className={styles.footermark}>
          <div>icon</div>
          <div>21.11ETH</div>
          <div>0.01E = $127; 31GWEI = $0.75</div>
        </div> */}
        </div>
        <div
          className={styles.shortcutoption}
          ref={shortcutOption}
          onClick={handleEthAmount}
        >
          <div data-amount={donateVal1}>
            {donateVal1}
            {primaryCoin}
          </div>
          <div data-amount={donateVal2}>
            {donateVal2}
            {primaryCoin}
          </div>
          <div data-amount={donateVal3}>
            {donateVal3}
            {primaryCoin}
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
          disabled={!write}
          onClick={handleDonate}
        >
          {showLoading ? <Loading></Loading> : null}
          {showLoading ? (
            <div>Confirm in wallet...</div>
          ) : (
            <div>DONATE</div>
            // <div>≈$875.32</div>
          )}
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
