import classNames from 'classnames/bind';
import React, { useContext } from 'react';
import { Donate3Context } from '../../context/Donate3Context';
import styles from './TotalCircle.module.css';

export interface Props {
  size: number;
  className?: string;
  style?: object;
}

function TotalCircle(props: Props) {
  let cx = classNames.bind(styles);
  const myStyle = {
    width: `${props.size}px`,
    height: `${props.size}px`,
    lineHeight: `${props.size - 4}px`,
  };
  const allStyle = { ...myStyle, ...props.style };

  const { total } = useContext(Donate3Context);
  return (
    <>
      {total ? (
        <div className={cx(styles.circle, props.className)} style={allStyle}>
          {total}
        </div>
      ) : null}
    </>
  );
}

export default React.memo(TotalCircle);
