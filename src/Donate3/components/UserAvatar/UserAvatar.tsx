import classNames from 'classnames/bind';
import React from 'react';
import { DonorRecord, DonorResult } from '../../App';
import Avatar from '../Avatar/Avatar';
import styles from './UserAvatar.module.css';

function UserAvatar(props: {
  type: string;
  normalmode?: boolean;
  donorResult: DonorResult | undefined;
}) {
  let cx = classNames.bind(styles);
  const donorTotal = props?.donorResult?.result?.records?.length || 0;
  const makeDonateUserAvatar = () => {
    if (!props.donorResult) return;
    let dom = [];
    const records = props.donorResult?.result?.records.slice(0, 5);
    dom = records.map((item: DonorRecord, index: number) => {
      return (
        <Avatar key={index} address={item.fromAddress} width={'40px'}></Avatar>
      );
    });
    dom.push(
      <div key={'lastitem'} className={styles.total}>
        {donorTotal}
      </div>,
    );
    return dom;
  };

  return (
    <div className={cx({ normalmode: props.normalmode && props.type === '2' })}>
      <div className={styles.donateusers}>{makeDonateUserAvatar()}</div>
      {props.type === '1' ? (
        <div className={styles.donateuserdec}>已有{donorTotal}人向他捐赠</div>
      ) : null}
    </div>
  );
}

export default React.memo(UserAvatar);
