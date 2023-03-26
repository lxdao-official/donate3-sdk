import classNames from 'classnames/bind';
import React from 'react';
import Avatar from '../Avatar/Avatar';
import styles from './UserAvatar.module.css';

function UserAvatar(props: { type: string; normalmode?: boolean }) {
  const makeDonateUserAvatar = () => {
    let dom = [];
    // const url = 'https://i.imgur.com/RbcuN95.jpeg';
    // const myStyle = {
    //   backgroundImage: `url('${url}')`,
    //   backgroundSize: 'cover',
    //   backgroundRepeat: 'no-repeat',
    // };
    dom = [
      '0xd332DCa2B5681Cc5e7E69C44B00182EbA2A6dcF5',
      '0xd332DCa2B5681Cc5e7E69C44B00182EbA2A6dcF5',
      '0xd332DCa2B5681Cc5e7E69C44B00182EbA2A6dcF5',
      '0xd332DCa2B5681Cc5e7E69C44B00182EbA2A6dcF5',
      '0xd332DCa2B5681Cc5e7E69C44B00182EbA2A6dcF5',
      '0xd332DCa2B5681Cc5e7E69C44B00182EbA2A6dcF5',
      '0xd332DCa2B5681Cc5e7E69C44B00182EbA2A6dcF5',
      '0xd332DCa2B5681Cc5e7E69C44B00182EbA2A6dcF5',
      '0xd332DCa2B5681Cc5e7E69C44B00182EbA2A6dcF5',
    ].map((item) => {
      return <Avatar key={item} address={item} width={'30px'}></Avatar>;
    });
    dom.push(
      <div key={'lastitem'} className={styles.donateuseravatar}>
        190
      </div>,
    );
    return dom;
  };
  let cx = classNames.bind(styles);

  return (
    <div className={cx({ normalmode: props.normalmode && props.type === '2' })}>
      <div className={styles.donateusers}>{makeDonateUserAvatar()}</div>
      {props.type === '1' ? (
        <div className={styles.donateuserdec}>已有198人向他捐赠</div>
      ) : null}
    </div>
  );
}

export default UserAvatar;
