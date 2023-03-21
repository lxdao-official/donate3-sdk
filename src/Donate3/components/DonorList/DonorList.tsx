import classNames from 'classnames/bind';
import React from 'react';
import styles from './DonorList.module.css';

export interface DonorListProps {
  name: string;
  address: string;
  type: string;
  normalmode?: boolean;
}

function DonorList(props: DonorListProps) {
  let cx = classNames.bind(styles);
  console.log('DonorList::', props);
  return (
    <div className={cx(styles.wrap)}>
      <div></div>
      <div className={styles.recipientinfo}>
        <div>Donate to {props.name}</div>
        <div>To:{props.address}</div>
      </div>
      <div></div>
    </div>
  );
}

//

export default DonorList;
