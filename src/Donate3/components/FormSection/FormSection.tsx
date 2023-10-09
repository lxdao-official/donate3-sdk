import { BigNumber, ethers } from 'ethers';
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Donate3Context } from '../../context/Donate3Context';
import { ReactComponent as Sol } from '../../images/sol.svg';
import { ReactComponent as Loading } from '../../images/loading.svg';
import { Metaplex } from '@metaplex-foundation/js';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import { AnchorProvider, BN, Program, utils, web3 } from '@coral-xyz/anchor';
import { IDL } from '../../donate3';


import {
  DONATE_VALUE_MAP,
  PrimaryCoinType,
  PRIMARY_COIN
} from '../../utils/const';
import Success from '../Success/Success';
import styles from './FormSection.module.css';
interface contractMap {
  [key: number]: `${string}`;
}

function FormSection() {
  const [amount, setAmount] = useState('0');
  const [message, setMessage] = useState(' ');
  const [primaryCoin, setPrimaryCoin] = useState<string>('ETH');
  const [donateCreateSuccess, setDonateCreateSuccess] = useState(false);
  const shortcutOption = useRef(null);
  const CONTRACT_MAP: contractMap = {
    1: '0x3a42DDc676F6854730151750f3dBD0ebFE3c6CD3', // ETH
  };

  const {
    toAddress,
    fromAddress,
    isConnected,
    setShowLoading,
    showLoading,
    color,
  } = React.useContext(Donate3Context);
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const wallet = useAnchorWallet();

  const timeout = 5; // s

  useEffect(() => {
    if (!toAddress) {
      toast('unsupport chain');
    }
    setPrimaryCoin(PRIMARY_COIN["Solana"] as string);
  }, [toAddress]);

  useEffect(() => {
    if (toAddress === fromAddress) {
      toast('Can not donate to yourself!');
    }
  }, [toAddress, fromAddress]);

  let amountIn: BigNumber | '' = 0 || '';
  if (!Number.isNaN(Number(amount))) {
    amountIn = amount && ethers.utils.parseUnits(amount.toString(), '9');
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
      let mintKey = web3.Keypair.generate();
      const metaplex = Metaplex.make(connection);
      const NftTokenAccount = getAssociatedTokenAddressSync(
        mintKey.publicKey,
        publicKey!,
      );

      const metadataPDA = metaplex
        .nfts()
        .pdas()
        .metadata({ mint: mintKey.publicKey });

      const mintMasterPDA = metaplex
        .nfts()
        .pdas()
        .masterEdition({ mint: mintKey.publicKey });
      const anchor_provider = new AnchorProvider(connection, wallet!, {});
      const pg = new Program(
        IDL,
        '3yz5aQ6A5w5mWicriDkAHAqGEC4LDU2A9gLmtxTUbmdx',
        anchor_provider,
      );
      // const pubKey = new PublicKey("7BzGMomgbswT6ynUmbkqA2mh2h9oGNgfKwfR2GrEmvRT");
      // Serialize the payload

      try {
        await pg.methods
          .transferLamports(new BN(amountIn.toString()), message)
          .accounts({
            signer: publicKey!,
            to: new PublicKey(toAddress ?? ''),
            tokenMint: mintKey.publicKey,
            tokenAccount: NftTokenAccount,
            metadataAccount: metadataPDA,
            masterEdition: mintMasterPDA,
            tokenMetadataProgram: new web3.PublicKey(
              'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
            ),
            associatedTokenProgram: utils.token.ASSOCIATED_PROGRAM_ID,
          })
          .signers([mintKey])
          .rpc();

        toast('Syncing data, take 1-5 minutes to show');
        setDonateCreateSuccess(true);
      } catch (error: any) {
        toast(String(error));
      }
      setShowLoading(false);
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
    // @ts-ignore
    shortcutOption?.current?.childNodes?.forEach((item) => {
      item.classList.remove(styles.active);
    });
  };

  const donateVal = DONATE_VALUE_MAP['Solana'] || [
    0.1, 0.5, 5,
  ];

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <section className={styles.appcontent}>
        <div>
          <div className={styles.title}>Payment Method</div>
          <div className={styles.methodinput} >
            <div className={styles.cointxt}>
              {<Sol />}

              <span>{`SOL`}</span>
              <span>{`Solana`}</span>
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
