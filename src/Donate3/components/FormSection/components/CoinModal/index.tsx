import React from 'react';
import { IToken } from '../../config';
import CoinCard from '../CoinCard';
import { CloseIcon } from './CloseIcon';
import styles from './index.module.css';

interface ICoinModalProps {
  onClosePress: () => void;
  visible: boolean;
  tokens: IToken[] | [];
  onCoinCardClick: (address: string) => void;
}

const CoinModal = ({ onClosePress, visible, tokens, onCoinCardClick }: ICoinModalProps) => {
  return visible ? (
    <div className={styles.coinModalWrapper}>
      <div className={styles.mask}></div>
      <div className={styles.main}>
        <div className={styles.top}>
          <div>Switch Tokens</div>
          <div className={styles.closeBtn} onClick={onClosePress}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.content}> 
          {tokens.map(({ logo, name, selected, address }) => {
            return (
              <CoinCard
                icon={logo}
                name={name}
                selected={selected!}
                key={name}
                address={address}
                onCoinCardClick={onCoinCardClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default React.memo(CoinModal);
