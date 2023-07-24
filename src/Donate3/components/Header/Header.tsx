import classNames from 'classnames/bind';
import React from 'react';
import { Donate3Context } from '../../context/Donate3Context';
import { DONATE_TYPE } from '../../utils/const';
import IPFSAvatar from '../IPFSAvatar/IPFSAvatar';
import TotalCircle from '../TotalCircle/TotalCircle';
import styles from './Header.module.css';

export interface HeaderProps {
  normalmode?: boolean;
}

function Header({ normalmode }: HeaderProps) {
  const { type, toAddress, title, setShowDonorList, avatar } =
    React.useContext(Donate3Context);

  let cx = classNames.bind(styles);
  return (
    <header
      className={cx(styles.header, {
        normalmode: normalmode && type === DONATE_TYPE.EMBED,
      })}
    >
      <div className={styles.recipientinfo}>
        <div>Donate to {title}</div>
        <div>
          To:
          {toAddress &&
            `${toAddress.slice(0, 6)}...${toAddress.slice(
              toAddress.length - 4,
            )}`}
        </div>
      </div>
      <div
        className={styles.avatarwrap}
        onClick={() => {
          setShowDonorList(true);
        }}
      >
        <fieldset className={styles.fieldset}>
          <legend>
            <IPFSAvatar src={avatar} address={toAddress} className={styles.avatar} />
          </legend>
        </fieldset>
        {normalmode ? null : (
          <TotalCircle size={30} className={styles.total}></TotalCircle>
        )}
      </div>
    </header>
  );
}

//

export default React.memo(Header);
