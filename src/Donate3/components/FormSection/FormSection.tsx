import { useChainModal } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import React, { MouseEvent, useEffect, useState } from 'react';
import { useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi';
import { useCreateDonate } from '../../hooks/useDonate';
// import { ReactComponent as SemiLogo } from '../../images/semilogo';
import abi from '../../abi.json';
import { Donate3Context } from '../../context/Donate3Context';
import { ReactComponent as Eth } from '../../images/eth.svg';
import { ReactComponent as Loading } from '../../images/loading.svg';
import { ReactComponent as Switch } from '../../images/switch.svg';
import Success from '../Success/Success';
import styles from './FormSection.module.css';

function FormSection() {
  const { openChainModal } = useChainModal();
  const { chain } = useNetwork();
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [donateCreateSuccess, setDonateCreateSuccess] = useState(false);
  const createDonate = useCreateDonate();
  const {
    toAddress,
    fromAddress,
    setShowSemiModal,
    isConnected,
    setShowLoading,
    showLoading,
  } = React.useContext(Donate3Context);
  const timeout = 5; // s

  let pid = 3;
  // let _merkleProof = '';
  // const amountIn = new BigNumber(amount * Math.pow(10, 18));
  const amountIn = amount && ethers.utils.parseEther(amount.toString());
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
  const { config } = usePrepareContractWrite({
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
  } = useContractWrite(config);
  // console.log(
  //   '合约数据变更',
  //   transactionData,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   isIdle,
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
    if (donateCreateSuccess) {
      setTimeout(() => {
        setDonateCreateSuccess(false);
      }, timeout * 1000);
    }
  }, [donateCreateSuccess]);

  const asyncFunc = async () => {
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

  useEffect(() => {
    if (isSuccess) {
      setShowLoading(false);
      asyncFunc();
    }
    if (isError) {
      setShowLoading(false);
    }
  }, [isSuccess, isError]);

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

  const handleManualAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  return (
    <section className={styles.appcontent}>
      <div>
        <div className={styles.title}>Payment Method</div>
        <div className={styles.methodinput}>
          <div className={styles.cointxt}>
            <Eth />
            <span>ETH</span>
            <span>Ethereum</span>
          </div>
          <div className={styles.switch} onClick={openChainModal}>
            <Switch />
          </div>
        </div>
        <div className={styles.footermark}>
          <div>icon</div>
          <div>21.11ETH</div>
          <div>0.01E = $127; 31GWEI = $0.75</div>
        </div>
      </div>
      <div className={styles.shortcutoption} onClick={handleEthAmount}>
        <div data-amount={0.001}>0.001 ETH</div>
        <div data-amount={0.01}>0.01 ETH</div>
        <div data-amount={0.5}>0.5 ETH</div>
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
        onChange={handleManualAmount}
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
        disabled={!write}
        onClick={handleDonate}
      >
        {showLoading ? <Loading></Loading> : null}
        {showLoading ? (
          <div>Confirm in wallet...</div>
        ) : (
          <div>DONATE3</div>
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
  );
}

//

export default React.memo(FormSection);
