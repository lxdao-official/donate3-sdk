import classNames from 'classnames/bind';
import React from 'react';
import { Donate3Context } from '../../context/Donate3Context';
import useNouns from '../../hooks/useNouns';
import { DONATE_TYPE } from '../../utils/const';
import TotalCircle from '../TotalCircle/TotalCircle';
import styles from './Header.module.css';

export interface HeaderProps {
  normalmode?: boolean;
}

function Header({ normalmode }: HeaderProps) {
  const { type, toAddress, title, setShowDonorList } =
    React.useContext(Donate3Context);
  const base64Hash = useNouns(toAddress);

  let cx = classNames.bind(styles);
  return (
    <header
      className={cx(styles.header, {
        normalmode: normalmode && type === DONATE_TYPE.NORMAL,
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
            {base64Hash ? (
              <img
                className={styles.avatar}
                alt="avatar"
                src={`data:image/svg+xml;base64,${base64Hash}`}
              />
            ) : (
              <img
                className={styles.avatar}
                src="https://i.328888.xyz/2023/03/12/vk3wZ.png"
              ></img>
            )}
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
