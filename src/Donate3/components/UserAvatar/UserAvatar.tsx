import classNames from 'classnames/bind';
import React from 'react';
import styles from './UserAvatar.module.css';

function UserAvatar(props: { type: number }) {
  const makeDonateUserAvatar = () => {
    let dom = [];
    const url = 'https://i.imgur.com/RbcuN95.jpeg';
    const myStyle = {
      backgroundImage: `url('${url}')`,
      height: '30px',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    };
    dom = ['aa', 'bb', 'cc'].map((item) => (
      <div key={item} className={styles.donateuseravatar} style={myStyle}></div>
    ));
    dom.push(
      <div key={'lastitem'} className={styles.donateuseravatar}>
        190
      </div>,
    );
    return dom;
  };
  let cx = classNames.bind(styles);

  return (
    <div className={cx({ normalmode: props.type === 2 })}>
      <div className={styles.donateusers}>{makeDonateUserAvatar()}</div>
      {props.type === 1 ? (
        <div className={styles.donateuserdec}>已有198人向他捐赠</div>
      ) : null}
    </div>
  );
}

export default UserAvatar;
