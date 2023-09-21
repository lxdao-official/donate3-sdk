import React from 'react';
import { CloseIcon } from './CloseIcon';

import { ReactComponent as EthSvg } from '../../../../images/eth.svg';
import CoinCard from '../CoinCard';

import styles from './index.module.css';

interface ICoinModalProps {
  onPress: () => void;
  visible: boolean;
}

const CoinModal = ({ onPress, visible }: ICoinModalProps) => {
  const cardInfo = [
    {
      icon: <EthSvg />,
      name: 'USDC',
      selected: false,
    },
    {
      icon: <EthSvg />,
      name: 'USDC',
      selected: false,
    },
    {
      icon: <EthSvg />,
      name: 'USDC',
      selected: false,
    },
    {
      icon: <EthSvg />,
      name: 'USDC',
      selected: false,
    },
    {
      icon: <EthSvg />,
      name: 'USDC',
      selected: true,
    },
    {
      icon: <EthSvg />,
      name: 'USDC',
      selected: false,
    },
  ];

  return visible ? (
    <div className={styles.coinModalWrapper}>
      <div className={styles.mask}></div>
      <div className={styles.main}>
        <div className={styles.top}>
          <div>Switch Networks</div>
          <div className={styles.closeBtn} onClick={onPress}>
            <CloseIcon />
          </div>
        </div>
        <div className={styles.content}>
          {cardInfo.map(({ icon, name, selected }) => {
            return (
              <CoinCard
                icon={icon}
                name={name}
                selected={selected}
                key={name}
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
