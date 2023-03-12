import classNames from 'classnames/bind';
import React from 'react';
import useNouns from '../../hooks/useNouns';
// import { ReactComponent as Avatar } from '../../images/avatar.svg';
import styles from './Header.module.css';

export interface HeaderProps {
  name: string;
  address: string;
  type: number;
  normalmode?: boolean;
}

function Header(props: HeaderProps) {
  const base64Hash = useNouns(props.address);
  let cx = classNames.bind(styles);
  console.log('header::', props);
  return (
    <header
      className={cx(styles.header, {
        normalmode: props.normalmode && props.type === 2,
      })}
    >
      <div className={styles.recipientinfo}>
        <div>Donate to {props.name}</div>
        <div>To:{props.address}</div>
      </div>
      <div>
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
      </div>
    </header>
  );
}

//

export default Header;
