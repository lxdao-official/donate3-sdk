import React from 'react';

import Switch from '../../../../images/switch.svg';

import { IToken } from '../../config';
import styles from './index.module.css';

interface ICoinPartProps {
  onPress: () => void;
  token: IToken | undefined;
}

const CoinPart = ({ onPress, token }: ICoinPartProps) => {
  return (
    <div className={styles.coinPartWrapper} onClick={onPress}>
      <div className={styles.coinIcon}>
        <img src={token?.logo} alt="" />
      </div>
      <div className={styles.coinName}>{token?.name}</div>
      <div className={styles.switch}>
        <img src={Switch} />
      </div>
    </div>
  );
};
export default React.memo(CoinPart);
