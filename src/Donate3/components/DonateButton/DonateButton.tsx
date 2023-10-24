import classNames from 'classnames/bind';
import React from 'react';
import { Donate3Context } from '../../context/Donate3Context';
import Logo from '../../images/logowhite.svg';
import { DONATE_TYPE } from '../../utils/const';
import styles from './DonateButton.module.css';

function DonateButton() {
  let cx = classNames.bind(styles);
  const { type, toAddress, color } = React.useContext(Donate3Context);
  // console.log('DONATE_TYPE.EMBED', DONATE_TYPE.EMBED, type);
  let wrapStyles = cx(
    styles.wrap,
    {
      largewrap: type === DONATE_TYPE.EMBED,
    },
    {
      tinywrap: type === DONATE_TYPE.FLOAT,
    },
  );
  return (
    <div className={wrapStyles} style={{ background: color }}>
      <img src={Logo} className={styles.img} />
      <span>Donate3</span>
      {type === DONATE_TYPE.EMBED ? (
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
