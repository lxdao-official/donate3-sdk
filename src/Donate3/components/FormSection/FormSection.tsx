import { useChainModal } from '@rainbow-me/rainbowkit';
import React, { MouseEvent, useEffect, useMemo, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { parseEther, parseUnits, stringToHex, zeroAddress } from 'viem';
import {
  erc20ABI,
  useContractWrite,
  usePublicClient,
  useWalletClient,
} from 'wagmi';
import {
  arbitrum,
  mainnet,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  sepolia,
} from 'wagmi/chains';
import abi from '../../abi.json';
import { Donate3Context } from '../../context/Donate3Context';
import Arbitrum from '../../images/arb.svg';
import Eth from '../../images/eth.svg';
import Linea from '../../images/linea.svg';
import Loading from '../../images/loading.svg';
import Optimism from '../../images/op.svg';
import Polygon from '../../images/polygon.svg';
import Switch from '../../images/switch.svg';
import Success from '../Success/Success';
import CoinPart from './components/CoinPart';

import CoinModal from './components/CoinModal';
import {
  arbitrumTokensInfo,
  IToken,
  lineaTokensInfo,
  mainnetTokensInfo,
  optimismGoerliTokensInfo,
  optimismTokensInfo,
  polygonTokensInfo,
  sepoliaTokensInfo,
  testNetTokensInfo,
} from './config';
import styles from './FormSection.module.css';
interface contractMap {
  [key: number]: `0x${string}`;
}

function FormSection() {
  const { openChainModal } = useChainModal();
  const [amount, setAmount] = useState('0');
  const [message, setMessage] = useState('');
  const [donateCreateSuccess, setDonateCreateSuccess] = useState(false);
  const shortcutOption = useRef<any>(null);
  const CONTRACT_MAP: contractMap = {
    // 5: '0x888702fa547Ba124f8d8440a4DB95A6ddA81A737',
    // 80001: '0xac511F51C3a89639072144aB539192eca267F823',
    // 137: '0x0049c7684a551e581D8de08fD2827dFF9808d162',
    1: '0xDD935a5aAC5Ae89E4A4b3f729C58562246A5fB01', // ETH
    5: '0xBe0bB0e92426334C5F2Ef488D2dC741065200B79', // goerli
    10: '0xa753c59E7aF6d7331ddF57Db7954bB234e470023', // optimism
    42161: '0x5e0A4a381590B955c53646b0483B86F4AD78e8FE', // arb one
    59144: '0x58706AC79f4A3d63519A623eE1a03f37afe59620', // linea
    137: '0x0049c7684a551e581D8de08fD2827dFF9808d162', // polygon
    80001: '0xc12abd5F6084fC9Bdf3e99470559A80B06783c40', // mubai
    11155111: '0xf1f5219C777E44BCd2c2C43b6aCe2458169c0579', // sepolia
    420: '0x39fF8a675ffBAfc177a7C54556b815163521a8B7', //optimism goerli
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

  const timeout = 10; // s
  const [coinModalVisible, setCoinModalVisible] = useState<boolean>(false);
  const [tokenList, setTokenList] = useState<IToken[] | []>([]);
  const [selectedToken, setSelectedToken] = useState<IToken>();
  const [transactionHash, setTransactionHash] = useState<string>('');
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
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

  let amountIn: bigint = BigInt(0);
  if (!Number.isNaN(Number(amount))) {
    amountIn = (amount && parseEther(amount.toString())) || BigInt(0);
  }

  const bytesMsg = stringToHex(message);

  const {
    // data: transactionData,
    // error:writeError,
    writeAsync,
  } = useContractWrite({
    address: CONTRACT_MAP[chain?.id || 0],
    abi: abi,
    functionName: 'donate',

    onSuccess(data) {
      setTransactionHash(data?.hash);
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
    if (
      !fromAddress ||
      !publicClient ||
      !walletClient ||
      !selectedToken?.address
    )
      return;

    const tokenAddress = selectedToken.address as `0x${string}`;

    let approveAmount = await publicClient.readContract({
      address: tokenAddress || zeroAddress,
      abi: erc20ABI,
      functionName: 'allowance',
      args: [fromAddress, CONTRACT_MAP[chain?.id || 0]],
    });

    let amountInToken = parseUnits(amount, selectedToken?.decimals || 18);
    if (BigInt(approveAmount) < BigInt(amountInToken)) {
      let txn = await walletClient.writeContract({
        address: tokenAddress || zeroAddress,
        abi: erc20ABI,
        functionName: 'approve',
        args: [CONTRACT_MAP[chain?.id || 0], BigInt(amountInToken)],
      });
      await publicClient.waitForTransactionReceipt({ hash: txn });
      await writeAsync?.({
        args: [tokenAddress, amountInToken, toAddress, bytesMsg, []],
      });
    } else {
      await writeAsync?.({
        args: [tokenAddress, amountInToken, toAddress, bytesMsg, []],
      });
    }
  };

  const handleDonate = async () => {
    if (isConnected) {
      if (showLoading) {
        return;
      }
      setShowLoading(true);

      try {
        // ERC20 token should approve
        if (selectedToken?.address !== zeroAddress) {
          await erc20TokenApprove();
          return;
        }
        if (chain.id === 137 || chain.id === 80001) {
          let hash = await walletClient?.writeContract({
            address: CONTRACT_MAP[chain?.id || 0],
            abi: [
              {
                inputs: [
                  {
                    internalType: 'uint256',
                    name: 'amountIn',
                    type: 'uint256',
                  },
                  { internalType: 'address', name: 'to', type: 'address' },
                  { internalType: 'bytes', name: 'message', type: 'bytes' },
                  {
                    internalType: 'bytes32[]',
                    name: '_merkleProof',
                    type: 'bytes32[]',
                  },
                ],
                name: 'donateToken',
                outputs: [],
                stateMutability: 'payable',
                type: 'function',
              },
            ],
            functionName: 'donateToken',
            args: [amountIn, toAddress!, bytesMsg, []],
            value: amountIn,
          });
          setTransactionHash(hash!)
          setShowLoading(false);
          toast('Syncing data, take 1-5 minutes to show');
          setDonateCreateSuccess(true);
          await publicClient.waitForTransactionReceipt({ hash: hash! })
        } else {
          await writeAsync?.({
            args: [zeroAddress, amountIn, toAddress, bytesMsg, []],
            value: amountIn,
          });
        }
      } catch (e) {
        let errMsg = String(e);
        console.log(errMsg);
        if (errMsg.includes('User rejected the request')) {
          toast('User rejected the request');
        } else if (errMsg?.includes('insufficient')) {
          toast(String('insufficient funds for gas'));
        } else if (errMsg?.includes('The donor address is equal to receive')) {
          toast(String('The donor address is equal to receive'));
        } else if (errMsg.includes('Invalid input amount')) {
          toast(String('Invalid input amount'));
        } else if (errMsg) {
          toast(String("Sorry, Something's wrong!"));
        }
        setTransactionHash('');
      } finally {
        setShowLoading(false);
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

  const handleManualAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setAmount(event.target.value);
  };

  const handleManualAmountFocus = () => {
    shortcutOption?.current?.childNodes?.forEach((item: any) => {
      item.classList.remove(styles.active);
    });
  };

  const donateVal = useMemo(() => {
    return selectedToken?.isErc20 ? [1, 5, 10] : [0.001, 0.01, 0.5];
  }, [selectedToken]);

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
        return mainnetTokensInfo;
      case optimism.id:
        return optimismTokensInfo;
      case polygon.id:
        return polygonTokensInfo;
      case arbitrum.id:
        return arbitrumTokensInfo;
      case polygonMumbai.id:
        return polygonTokensInfo;
      case sepolia.id:
        return sepoliaTokensInfo;
      case optimismGoerli.id:
        return optimismGoerliTokensInfo;
      case 59144:
        return lineaTokensInfo;
      default:
        return testNetTokensInfo;
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
        selected: false,
      };
    });
    // set selected true
    const index = temp.findIndex((item) => item.address === v);
    temp[index].selected = true;

    setSelectedToken(temp[index]);

    return temp;
  };

  const handleClickCoinCard = (v: string) => {
    setTokenList(genNewTokenInfo(v));
    handleClickCoinModalClose();
  };

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
                {(chain?.id as number) === 1 && <img src={Eth} />}
                {(chain?.id as number) === 10 && <img src={Optimism} />}
                {(chain?.id as number) === 59144 && <img src={Linea} />}
                {(chain?.id as number) === 137 && <img src={Polygon} />}
                {(chain?.id as number) === 42161 && <img src={Arbitrum} />}
                {(chain?.id as number) === 5 && <img src={Eth} />}
                {(chain?.id as number) === 80001 && <img src={Polygon} />}
                {(chain?.id as number) === 11155111 && <img src={Eth} />}
                {(chain?.id as number) === 420 && <img src={Optimism} />}
              </div>
              <div className={styles.chainName}>{chain?.name}</div>
              <div className={styles.switch}>
                <img src={Switch} />
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
          {showLoading ? <img src={Loading} /> : null}
          {showLoading ? <div>Confirm in wallet...</div> : <div>DONATE</div>}
        </button>
        {donateCreateSuccess ? (
          <Success
            timeout={timeout}
            transactionHash={transactionHash!}
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
