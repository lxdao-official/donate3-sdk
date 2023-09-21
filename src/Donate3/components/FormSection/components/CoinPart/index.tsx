import React from 'react';
import { ReactComponent as Eth } from '../../../../images/eth.svg';
import { ReactComponent as Switch } from '../../../../images/switch.svg';

import styles from './index.module.css';

interface ICoinPartProps {
  onPress: () => void;
}

const CoinPart = ({ onPress }: ICoinPartProps) => {
  return (
    <div className={styles.coinPartWrapper} onClick={onPress}>
      <div className={styles.coinIcon}>
        <Eth />
      </div>
      <div className={styles.coinName}>USDT</div>
      <div className={styles.switch}>
        <Switch />
      </div>
    </div>
  );
};
export default React.memo(CoinPart);
