import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { ReactComponent as Close } from '../../images/close.svg';
import { ReactComponent as SortBg } from '../../images/sortbg.svg';
import Avatar from '../Avatar/Avatar';
import styles from './DonorList.module.css';

export interface DonorListProps {}
export interface Data {
  imgUrl: string;
  key: string;
  desc: string;
}
export interface TopData {
  imgUrl: string;
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
        imgUrl: 'https://i.328888.xyz/2023/03/12/vkcMH.png',
        key: '1',
        desc: 'desc',
      },
      {
        imgUrl: 'https://i.328888.xyz/2023/03/12/vkcMH.png',
        key: '1',
        desc: 'desc',
      },
      {
        imgUrl: 'https://i.328888.xyz/2023/03/12/vkcMH.png',
        key: '1',
        desc: 'desc',
      },
      {
        imgUrl: 'https://i.328888.xyz/2023/03/12/vkcMH.png',
        key: '1',
        desc: 'desc',
      },
      {
        imgUrl: 'https://i.328888.xyz/2023/03/12/vkcMH.png',
        key: '1',
        desc: 'desc',
      },
      {
        imgUrl: 'https://i.328888.xyz/2023/03/12/vkcMH.png',
        key: '1',
        desc: 'desc',
      },
      {
        imgUrl: 'https://i.328888.xyz/2023/03/12/vkcMH.png',
        key: '1',
        desc: 'desc',
      },
      {
        imgUrl: 'https://i.328888.xyz/2023/03/12/vkcMH.png',
        key: '1',
        desc: 'desc',
      },
      {
        imgUrl: 'https://i.328888.xyz/2023/03/12/vkcMH.png',
        key: '1',
        desc: 'desc',
      },
      {
        imgUrl: 'https://i.328888.xyz/2023/03/12/vkcMH.png',
        key: '1',
        desc: 'desc',
      },
      {
        imgUrl: 'https://i.328888.xyz/2023/03/12/vkcMH.png',
        key: '1',
        desc: 'desc',
      },
      {
        imgUrl: 'https://i.328888.xyz/2023/03/12/vkcMH.png',
        key: '1',
        desc: 'desc',
      },
      {
        imgUrl: 'https://i.328888.xyz/2023/03/12/vkcMH.png',
        key: '1',
        desc: 'desc',
      },
    ]);
  }, []);

  const mockTopData = [
    {
      imgUrl: 'https://i.328888.xyz/2023/03/12/vkcMH.png',
      amount: 433.21,
      count: 3,
    },
    {
      imgUrl: 'https://i.328888.xyz/2023/03/12/vkcMH.png',
      amount: 432.21,
      count: 4,
    },
    {
      imgUrl: 'https://i.328888.xyz/2023/03/12/vkcMH.png',
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
          imgUrl={item.imgUrl}
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
            <Avatar imgUrl={item.imgUrl} width={'60px'}></Avatar>
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
