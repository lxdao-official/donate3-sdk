import classNames from 'classnames/bind';
import React from 'react';
import { Donate3Context } from '../../context/Donate3Context';
import useNouns from '../../hooks/useNouns';
import { DONATE_TYPE } from '../../utils/const';
import styles from './Header.module.css';

export interface HeaderProps {
  normalmode?: boolean;
}

function Header(props: HeaderProps) {
  const { type, toAddress, title, total } = React.useContext(Donate3Context);
  const base64Hash = useNouns(toAddress);

  let cx = classNames.bind(styles);
  return (
    <header
      className={cx(styles.header, {
        normalmode: props.normalmode && type === DONATE_TYPE.NORMAL,
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
      <div className={styles.avatarwrap}>
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
        {props.normalmode ? null : <div className={styles.total}>{total}</div>}
      </div>
    </header>
  );
}

//

export default React.memo(Header);
