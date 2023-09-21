import React, { ReactNode } from 'react';

import styles from './index.module.css';

interface ICoinCardProps {
  icon: ReactNode;
  name: string;
  selected: boolean;
}

const CoinCard = ({ icon, name, selected }: ICoinCardProps) => {
  return (
    <div
      className={`${styles.coinCardWrapper} ${
        selected ? styles.coinCardSelected : null
      }`}
    >
      <div className={styles.left}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.name}>{name}</div>
      </div>

      {selected ? (
        <div className={styles.right}>
          <div className={styles.selected}>Selected</div>
          <div className={styles.circle}></div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default React.memo(CoinCard);
