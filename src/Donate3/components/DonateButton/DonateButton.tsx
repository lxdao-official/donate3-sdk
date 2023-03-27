import classNames from 'classnames/bind';
import React from 'react';
import { Donate3Context } from '../../context/Donate3Context';
import { ReactComponent as LogoWhite } from '../../images/logowhite.svg';
import { DONATE_TYPE } from '../../utils/const';
import styles from './DonateButton.module.css';

function DonateButton() {
  let cx = classNames.bind(styles);
  const { type, toAddress } = React.useContext(Donate3Context);
  let wrapStyles = cx(
    styles.wrap,
    {
      largewrap: type === DONATE_TYPE.NORMAL,
    },
    {
      tinywrap: type === DONATE_TYPE.FLOAT,
    },
  );
  return (
    <div className={wrapStyles}>
      <LogoWhite className={styles.img}></LogoWhite>
      <span>Donate3</span>
      {type === DONATE_TYPE.NORMAL ? (
        <span>
          {toAddress &&
            `${toAddress.slice(0, 6)}...${toAddress.slice(
              toAddress.length - 4,
            )}`}
        </span>
      ) : null}
    </div>
  );
}

export default React.memo(DonateButton);
