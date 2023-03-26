import classNames from 'classnames/bind';
import React from 'react';
import useNouns from '../../hooks/useNouns';
import styles from './Header.module.css';

export interface HeaderProps {
  name: string;
  address: string;
  type: string;
  normalmode?: boolean;
  total: number | undefined;
}

function Header(props: HeaderProps) {
  const base64Hash = useNouns(props.address);

  let cx = classNames.bind(styles);
  return (
    <header
      className={cx(styles.header, {
        normalmode: props.normalmode && props.type === '2',
      })}
    >
      <div className={styles.recipientinfo}>
        <div>Donate to {props.name}</div>
        <div>To:{props.address}</div>
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
        <div className={styles.total}>{props.total}</div>
      </div>
    </header>
  );
}

//

export default React.memo(Header);
