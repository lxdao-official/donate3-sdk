import classNames from 'classnames/bind';
import React, { useContext } from 'react';
import { useNetwork } from 'wagmi';
import { DonorItem } from '../../@types/donate3';
import { Donate3Context } from '../../context/Donate3Context';
import { ReactComponent as Close } from '../../images/close.svg';
import { ReactComponent as SortBg } from '../../images/sortbg.svg';
import { EXPLORER_URL_MAP } from '../../utils/const';
import Avatar from '../Avatar/Avatar';
import TotalCircle from '../TotalCircle/TotalCircle';
import styles from './DonorList.module.css';

function DonorList() {
  const { chain } = useNetwork();

  let cx = classNames.bind(styles);

  const { donorList, setShowDonorList, showDonorList, loadingDonorList } =
    useContext(Donate3Context);

  const makeDonateDonorAvatar = (datas: DonorItem[] | undefined) => {
    if (loadingDonorList) {
      return <div>Loading...</div>;
    }
    if (!datas) {
      return <div>Be the first person to support him!</div>;
    }

    let dom: JSX.Element[] = [];
    const records = datas;
    if (records) {
      dom = records?.map((item: DonorItem, index: number) => {
        return (
          <div key={index} style={{ cursor: 'pointer' }}>
            <Avatar
              onClick={() => {
                window.open(
                  `${EXPLORER_URL_MAP[chain?.id || 0]}${item.address}`,
                  '_blank',
                );
              }}
              address={item.address}
              className={styles.itemavatar}
            ></Avatar>
          </div>
        );
      });
    }
    dom.push(
      <TotalCircle
        key={'lastItem'}
        size={40}
        className={styles.lastavatar}
      ></TotalCircle>,
    );
    return dom;
  };

  const makeTopDom = (datas: DonorItem[] | undefined) => {
    if (!datas?.length) return;
    let dom: JSX.Element[] = [];
    let records = datas?.slice(0, 3);
    const formatAmount = (v: string) => {
      let n = Number(v);
      n /= 10 ** 18;
      return n.toFixed(3);
    };
    // records.push(records[0]);
    if (datas.length) {
      dom = records?.map((item: DonorItem, index: number) => {
        return (
          <div key={index} className={styles.topitem}>
            <div className={styles.topimg}>
              <Avatar
                onClick={() => {
                  window.open(
                    `${EXPLORER_URL_MAP[chain?.id || 0]}${item.address}`,
                    '_blank',
                  );
                }}
                address={item.address}
                width={'60px'}
              ></Avatar>
            </div>
            <div className={styles.amount}>
              {formatAmount(item.totaldonation)}
            </div>
            <div className={styles.unit}>$</div>
            {/* <div className={styles.count}>捐赠{records.length}次</div> */}
          </div>
        );
      });
    }
    if (records.length < 3) {
      Array.from({ length: 3 - records.length }).forEach((val, index) => {
        return dom.push(
          <div key={index + records.length} className={styles.topitem}></div>,
        );
      });
    }
    const tmp = dom[1];
    dom[1] = dom[0];
    dom[0] = tmp;

    return dom;
  };

  return (
    <div className={cx(styles.wrap, { dialogZoomOut: !showDonorList })}>
      <div className={cx(styles.content)}>
        <div className={styles.header}>
          <div className={styles.title}>
            <span className={styles.titletxt}>Donor</span>
            <Close
              style={{ transform: 'scale(0.5)' }}
              onClick={() => {
                setShowDonorList(false);
              }}
            ></Close>
          </div>
          <div className={styles.top}>
            {makeTopDom(donorList)}
            <div className={styles.bg}>
              <SortBg></SortBg>
            </div>
          </div>
        </div>
        <div className={styles.list}>{makeDonateDonorAvatar(donorList)}</div>
      </div>
    </div>
  );
}

export default React.memo(DonorList);
