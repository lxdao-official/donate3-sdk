import { useChainModal } from '@rainbow-me/rainbowkit';
import { BigNumber, ethers } from 'ethers';
import React, { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useContractWrite } from 'wagmi';
import {
  arbitrum,
  mainnet,
  optimism,
  polygon,
  polygonMumbai,
  sepolia,
} from 'wagmi/chains';
import abi from '../../abi.json';
import erc20tokenAbi from "../../utils/erc20TokenAbi.json"
import { Donate3Context } from '../../context/Donate3Context';
import { ReactComponent as Arbitrum } from '../../images/arb.svg';
import { ReactComponent as Eth } from '../../images/eth.svg';
import { ReactComponent as Linea } from '../../images/linea.svg';
import { ReactComponent as Loading } from '../../images/loading.svg';
import { ReactComponent as Optimism } from '../../images/op.svg';
import { ReactComponent as Polygon } from '../../images/polygon.svg';
import { ReactComponent as Switch } from '../../images/switch.svg';
import Success from '../Success/Success';
import CoinPart from './components/CoinPart';

import CoinModal from './components/CoinModal';
import { arbitrumTokensInfo, DEFAULT_COIN_ADDRESS, IToken, mainnetTokensInfo, optimismTokensInfo, polygonTokensInfo, sepoliaTokensInfo, testNetTokensInfo } from './config';
import styles from './FormSection.module.css';
interface contractMap {
  [key: number]: `0x${string}`;
}

function FormSection() {
  const { openChainModal } = useChainModal();
  const [amount, setAmount] = useState('0');
  const [message, setMessage] = useState(' ');
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
    11155111: '0xf1f5219C777E44BCd2c2C43b6aCe2458169c0579', // sepolia
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
  const [coinModalVisible, setCoinModalVisible] = useState<boolean>(false);
  const [tokenList, setTokenList] = useState<IToken[] | []>([]);
  const [selectedToken, setSelectedToken] = useState<IToken>();

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

  let amountIn: BigNumber | '' = 0 || '';
  if (!Number.isNaN(Number(amount))) {
    amountIn = amount && ethers.utils.parseEther(amount.toString());
  }

  const bytesMsg = ethers.utils.toUtf8Bytes(message);
  let donateTokenArgs = [
    selectedToken?.address,
    amountIn,
    toAddress,
    bytesMsg,
    [],
    {
      value: amountIn,
    },
  ];

  const {
    data: transactionData,
    // error:writeError,
    writeAsync,
  } = useContractWrite({
    address: CONTRACT_MAP[chain?.id || 0],
    abi: abi,
    functionName: 'donate',
    mode: 'recklesslyUnprepared',
    onError(error) {
      const errMsg = error?.reason;
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


  const erc20TokenApprove = async () => {
    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum!)
    const signer = provider.getSigner();
    const tokenAddress = selectedToken?.address;

    const contract = new ethers.Contract(
      tokenAddress!,
      erc20tokenAbi!,
      signer,
    );
    await contract.approve(CONTRACT_MAP[chain?.id || 0], donateTokenArgs[1]);
  }

  const handleDonate = async () => {
    if (isConnected) {
      if (showLoading) {
        return;
      }
      setShowLoading(true);

      const _donateTokenArgs = [...donateTokenArgs];
      // ERC20 token should approve
      if (donateTokenArgs[0] !== DEFAULT_COIN_ADDRESS) {
        await erc20TokenApprove();
        _donateTokenArgs.pop();
      }
      setTimeout(async () => {
        await writeAsync?.({
          recklesslySetUnpreparedArgs: _donateTokenArgs,
        });
      }, 500);
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

  const donateVal = useMemo(() => {
    return selectedToken?.isErc20 ? [1, 5, 10] : [0.001, 0.01, 0.5]
  }, [selectedToken])

  const handleClickCoinPart = () => {
    setCoinModalVisible(true);
  };

  const handleClickCoinModalClose = () => {
    setCoinModalVisible(false);
  };

  // filter token info by chain
  const genTokenInfo = () => {
    switch (chain?.id) {
      case mainnet.id:
        return mainnetTokensInfo
      case optimism.id:
        return optimismTokensInfo
      case polygon.id:
        return polygonTokensInfo
      case arbitrum.id:
        return arbitrumTokensInfo
      case polygonMumbai.id:
        return polygonTokensInfo
      case sepolia.id:
        return sepoliaTokensInfo
      default:
        return testNetTokensInfo
    }
  };

  const getTokenInfoByChainId = () => {
    const tokens = genTokenInfo();
    // @ts-ignore
    setTokenList(tokens);
    // @ts-ignore
    setSelectedToken(tokens[0]);
  };

  useEffect(() => {
    if (chain?.id) {
      getTokenInfoByChainId();
    }
  }, [chain?.id]);


  const genNewTokenInfo = (v: string) => {
    let temp = [...tokenList];
    // set all item as false
    temp = temp.map((item) => {
      return {
        ...item,
        selected: false
      }
    })
    // set selected true
    const index = temp.findIndex((item) => item.address === v);
    temp[index].selected = true;

    setSelectedToken(temp[index])

    return temp;
  }


  const handleClickCoinCard = (v: string) => {
    setTokenList(genNewTokenInfo(v))
    handleClickCoinModalClose();
  }

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <section className={styles.appcontent}>
        <div>
          <div className={styles.title}>Payment Method</div>
          <div className={styles.methodinput}>
            <div className={styles.chainInput} onClick={openChainModal}>
              <div className={styles.cointxt}>
                {(chain?.id as number) === 1 && <Eth />}
                {(chain?.id as number) === 10 && <Optimism />}
                {(chain?.id as number) === 59144 && <Linea />}
                {(chain?.id as number) === 137 && <Polygon />}
                {(chain?.id as number) === 42161 && <Arbitrum />}
                {(chain?.id as number) === 5 && <Eth />}
                {(chain?.id as number) === 80001 && <Polygon />}
                {(chain?.id as number) === 11155111 && <Eth />}
                {(chain?.id as number) === 420 && <Optimism />}
              </div>
              <div className={styles.chainName}>{chain?.name}</div>
              <div className={styles.switch}>
                <Switch />
              </div>
            </div>

            {/* multi-coin*/}
            <CoinPart onPress={handleClickCoinPart} token={selectedToken} />
          </div>
        </div>
        <div
          className={styles.shortcutoption}
          ref={shortcutOption}
          onClick={handleEthAmount}
        >
          <div data-amount={donateVal[0]}>
            {donateVal[0]} {selectedToken?.symbol}
          </div>
          <div data-amount={donateVal[1]}>
            {donateVal[1]} {selectedToken?.symbol}
          </div>
          <div data-amount={donateVal[2]}>
            {donateVal[2]} {selectedToken?.symbol}
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
            toAddress={toAddress!}
            setDonateCreateSuccess={setDonateCreateSuccess}
          />
        ) : null}
      </section>

      <CoinModal
        tokens={tokenList}
        visible={coinModalVisible}
        onClosePress={handleClickCoinModalClose}
        onCoinCardClick={handleClickCoinCard}
      />
    </>
  );
}

//

export default React.memo(FormSection);
