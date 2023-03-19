import classNames from 'classnames/bind';
import React from 'react';
import styles from './Success.module.css';

export interface SuccessProps {
  name: string;
  address: string;
  type: string;
  normalmode?: boolean;
}

function Success(props: SuccessProps) {
  let cx = classNames.bind(styles);
  console.log('Success::', props);
  return (
    <div
      className={cx(styles.Success, {
        normalmode: props.normalmode && props.type === '2',
      })}
    >
      <div className={styles.recipientinfo}>
        <div>Donate to {props.name}</div>
        <div>To:{props.address}</div>
      </div>
      <div></div>
    </div>
  );
}

//

export default Success;
