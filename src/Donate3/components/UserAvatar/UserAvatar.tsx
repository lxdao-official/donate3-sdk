import classNames from 'classnames/bind';
import React from 'react';
import { DonorRecord } from '../../@types/donate3';
import { Donate3Context } from '../../context/Donate3Context';
import { DONATE_TYPE } from '../../utils/const';
import Avatar from '../Avatar/Avatar';
import TotalCircle from '../TotalCircle/TotalCircle';
import styles from './UserAvatar.module.css';

function UserAvatar(props: { normalmode?: boolean }) {
  let cx = classNames.bind(styles);
  const { type, donorList, total } = React.useContext(Donate3Context);
  const makeDonateUserAvatar = () => {
    if (!donorList) return;
    let dom = [];
    const records = donorList?.result?.records.slice(0, 5);
    dom = records.map((item: DonorRecord, index: number) => {
      return (
        <Avatar key={index} address={item.fromAddress} width={'40px'}></Avatar>
      );
    });
    dom.push(
      <TotalCircle
        key={'lastitem'}
        size={40}
        className={styles.total}
      ></TotalCircle>,
    );
    return dom;
  };

  return (
    <div
      className={cx({
        normalmode: props.normalmode && type === DONATE_TYPE.NORMAL,
      })}
    >
      <div className={styles.donateusers}>{makeDonateUserAvatar()}</div>
      {type === DONATE_TYPE.FLOAT ? (
        <div className={styles.donateuserdec}>已有{total}人向他捐赠</div>
      ) : null}
    </div>
  );
}

export default React.memo(UserAvatar);
