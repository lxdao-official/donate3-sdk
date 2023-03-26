import classNames from 'classnames/bind';
import React from 'react';
import { DonorRecord, DonorResult } from '../../App';
import { ReactComponent as Close } from '../../images/close.svg';
import { ReactComponent as SortBg } from '../../images/sortbg.svg';
import Avatar from '../Avatar/Avatar';
import styles from './DonorList.module.css';

export interface DonorListProps {
  setShowDonorList: any;
  toAddress: string;
  donorResult: DonorResult | undefined;
}

function DonorList(props: DonorListProps) {
  let cx = classNames.bind(styles);

  const makeDonateDonorAvatar = (datas: DonorResult | undefined) => {
    if (!datas) return;
    let dom = [];
    const records = datas?.result?.records;
    dom = records?.map((item: DonorRecord, index: number) => {
      return (
        <Avatar
          key={index}
          address={item.fromAddress}
          className={styles.listavatar}
        ></Avatar>
      );
    });
    dom.push(<Avatar>190</Avatar>);
    return dom;
  };

  const makeTopDom = (datas: DonorResult | undefined) => {
    if (!datas) return;
    let dom = [];
    const records = datas?.result?.records?.slice(0, 3);
    dom = records?.map((item: DonorRecord, index: number) => {
      return (
        <div key={index} className={styles.topitem}>
          <div className={styles.topimg}>
            <Avatar address={item.fromAddress} width={'60px'}></Avatar>
          </div>
          <div className={styles.amount}>${item.usdValue}</div>
          <div className={styles.count}>捐赠{item.value}次</div>
        </div>
      );
    });
    return dom;
  };

  return (
    <div className={cx(styles.wrap)}>
      <div className={cx(styles.content)}>
        <div className={styles.header}>
          <div className={styles.title}>
            <span className={styles.titletxt}>Donor</span>
            <Close
              style={{ transform: 'scale(0.5)' }}
              onClick={() => {
                props.setShowDonorList(false);
              }}
            ></Close>
          </div>
          <div className={styles.top}>
            {makeTopDom(props.donorResult)}
            <div className={styles.bg}>
              <SortBg></SortBg>
            </div>
          </div>
        </div>
        <div className={styles.list}>
          {makeDonateDonorAvatar(props.donorResult)}
        </div>
      </div>
    </div>
  );
}

export default React.memo(DonorList);
