import classNames from 'classnames/bind';
import React from 'react';
import { useNetwork } from 'wagmi';
import { DonorItem } from '../../@types/donate3';
import { Donate3Context } from '../../context/Donate3Context';
import { DONATE_TYPE, EXPLORER_URL_MAP } from '../../utils/const';
import Avatar from '../Avatar/Avatar';
import TotalCircle from '../TotalCircle/TotalCircle';
import styles from './UserAvatar.module.css';

function UserAvatar(props: { normalmode?: boolean }) {
  const { chain } = useNetwork();

  let cx = classNames.bind(styles);
  const { type, donorList, total, setShowDonorList } =
    React.useContext(Donate3Context);
  const makeDonateUserAvatar = () => {
    if (!donorList) return;
    let dom: JSX.Element[] = [];
    const records = donorList?.slice(0, 5);
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
              width={'40px'}
            ></Avatar>
          </div>
        );
      });
    }
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
      className={cx(styles.wrap, {
        normalmode: props.normalmode && type === DONATE_TYPE.EMBED,
      })}
      onClick={() => {
        setShowDonorList(true);
      }}
    >
      <div className={styles.donateusers}>{makeDonateUserAvatar()}</div>
      {type === DONATE_TYPE.FLOAT ? (
        <div className={styles.donateuserdec}>
          {total} people have donated to him/her
        </div>
      ) : null}
    </div>
  );
}

export default React.memo(UserAvatar);
