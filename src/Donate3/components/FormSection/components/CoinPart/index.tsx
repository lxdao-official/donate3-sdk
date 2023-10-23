import React from 'react';

import { ReactComponent as Eth } from '../../../../images/eth.svg';
import { ReactComponent as Switch } from '../../../../images/switch.svg';

import styles from './index.module.css';
import { IToken } from '../../config';

interface ICoinPartProps {
  onPress: () => void;
  token: IToken
}

const CoinPart = ({ onPress, token }: ICoinPartProps) => {

  return (
    <div className={styles.coinPartWrapper} onClick={onPress}>
      <div className={styles.coinIcon}>
        <img src={token?.logo} alt="" />
      </div>
      <div className={styles.coinName}>{token?.name}</div>
      <div className={styles.switch}>
        <Switch />
      </div>
    </div>
  );
};
export default React.memo(CoinPart);
