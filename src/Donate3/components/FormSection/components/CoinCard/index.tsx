import React from 'react';

import styles from './index.module.css';

interface ICoinCardProps {
  icon: string;
  name: string;
  selected: boolean;
  address: string | '';
  onCoinCardClick: (address: string) => void;
}

const CoinCard = ({
  icon,
  name,
  selected,
  address,
  onCoinCardClick,
}: ICoinCardProps) => {
  const handleClickCoinCard = () => {
    onCoinCardClick(address);
  };

  return (
    <div
      onClick={handleClickCoinCard}
      className={`${styles.coinCardWrapper} ${
        selected ? styles.coinCardSelected : null
      }`}
    >
      <div className={styles.left}>
        <img src={icon} className={styles.icon}></img>
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
