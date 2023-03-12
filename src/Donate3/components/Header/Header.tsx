import classNames from 'classnames/bind';
import React from 'react';
import useNouns from '../../hooks/useNouns';
import { ReactComponent as Avatar } from '../../images/avatar.svg';
import styles from './Header.module.css';

export interface HeaderProps {
  name: string;
  address: string;
  type: number;
}

function Header(props: HeaderProps) {
  const base64Hash = useNouns(props.address);
  let cx = classNames.bind(styles);
  console.log('header::', props);
  return (
    <header className={cx(styles.header, { normalmode: props.type === 2 })}>
      <div className={styles.recipientinfo}>
        <div>Donate to {props.name}</div>
        <div>To:{props.address}</div>
      </div>
      <div>
        {base64Hash ? (
          <img
            className={styles.avatar}
            alt="avatar"
            src={`data:image/svg+xml;base64,${base64Hash}`}
          />
        ) : (
          // <Image src={Avatar} alt="xxxx"></Image>
          <Avatar className={styles.avatar}></Avatar>
        )}
      </div>
    </header>
  );
}

//

export default Header;
