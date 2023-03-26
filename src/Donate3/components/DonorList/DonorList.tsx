import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { ReactComponent as Close } from '../../images/close.svg';
import { ReactComponent as SortBg } from '../../images/sortbg.svg';
import Avatar from '../Avatar/Avatar';
import styles from './DonorList.module.css';

export interface DonorListProps {}
export interface Data {
  address: string;
  key: string;
  desc: string;
}
export interface TopData {
  address: string;
  amount: number;
  count: number;
}

function DonorList(props: DonorListProps) {
  let cx = classNames.bind(styles);
  console.log('DonorList::', props);
  const [donorList, setDonorList] = useState<Data[]>([]);

  useEffect(() => {
    setDonorList([
      {
        address: '0xd332DCb2B5681Cc5e7E69C44B00182EbA2A6dcF5',
        key: '1',
        desc: 'desc',
      },
      {
        address: '0xd332DCb2B5681Cc5e7E69C44B00182EbA2A6dcF5',
        key: '1',
        desc: 'desc',
      },
      {
        address: '0xd332DCb2B5681Cc5e7E69C44B00182EbA2A6dcF5',
        key: '1',
        desc: 'desc',
      },
      {
        address: '0xd332DCb2B5681Cc5e7E69C44B00182EbA2A6dcF5',
        key: '1',
        desc: 'desc',
      },
      {
        address: '0xd332DCb2B5681Cc5e7E69C44B00182EbA2A6dcF5',
        key: '1',
        desc: 'desc',
      },
      {
        address: '0xd332DCb2B5681Cc5e7E69C44B00182EbA2A6dcF5',
        key: '1',
        desc: 'desc',
      },
      {
        address: '0xd332DCb2B5681Cc5e7E69C44B00182EbA2A6dcF5',
        key: '1',
        desc: 'desc',
      },
      {
        address: '0xd332DCb2B5681Cc5e7E69C44B00182EbA2A6dcF5',
        key: '1',
        desc: 'desc',
      },
      {
        address: '0xd332DCb2B5681Cc5e7E69C44B00182EbA2A6dcF5',
        key: '1',
        desc: 'desc',
      },
      {
        address: '0xd332DCb2B5681Cc5e7E69C44B00182EbA2A6dcF5',
        key: '1',
        desc: 'desc',
      },
      {
        address: '0xd332DCb2B5681Cc5e7E69C44B00182EbA2A6dcF5',
        key: '1',
        desc: 'desc',
      },
      {
        address: '0xd332DCb2B5681Cc5e7E69C44B00182EbA2A6dcF5',
        key: '1',
        desc: 'desc',
      },
      {
        address: '0xd332DCb2B5681Cc5e7E69C44B00182EbA2A6dcF5',
        key: '1',
        desc: 'desc',
      },
    ]);
  }, []);

  const mockTopData = [
    {
      address: '0xd332DCb2B5681Cc5e7E69C44B00182EbA2A6dcF5',
      amount: 433.21,
      count: 3,
    },
    {
      address: '0xd332DCb2B5681Cc5e7E69C44B00182EbA2A6dcF5',
      amount: 432.21,
      count: 4,
    },
    {
      address: '0xd332DCb2B5681Cc5e7E69C44B00182EbA2A6dcF5',
      amount: 132.21,
      count: 1,
    },
  ];

  const makeDonateUserAvatar = (datas: Data[]) => {
    let dom = [];
    dom = datas.map((item: Data, index: number) => {
      return (
        <Avatar
          key={index}
          address={item.address}
          className={styles.listavatar}
        ></Avatar>
      );
    });
    dom.push(<Avatar>190</Avatar>);
    return dom;
  };

  const makeTopDom = (datas: TopData[]) => {
    let dom = [];
    dom = datas.map((item: TopData, index: number) => {
      return (
        <div key={index} className={styles.topitem}>
          <div className={styles.topimg}>
            <Avatar address={item.address} width={'60px'}></Avatar>
          </div>
          <div className={styles.amount}>${item.amount}</div>
          <div className={styles.count}>捐赠{3}次</div>
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
            <Close style={{ transform: 'scale(0.5)' }}></Close>
          </div>
          <div className={styles.top}>
            {makeTopDom(mockTopData)}
            <div className={styles.bg}>
              <SortBg></SortBg>
            </div>
          </div>
        </div>
        <div className={styles.list}>{makeDonateUserAvatar(donorList)}</div>
      </div>
    </div>
  );
}

export default DonorList;
