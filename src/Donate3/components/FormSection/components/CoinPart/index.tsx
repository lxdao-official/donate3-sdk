import React from 'react';
import { ReactComponent as Eth } from '../../../../images/eth.svg';
import { ReactComponent as Switch } from '../../../../images/switch.svg';

import styles from './index.module.css';

const CoinPart = () => {
  return (
    <div className={styles.coinPartWrapper}>
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
