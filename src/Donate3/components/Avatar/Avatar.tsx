import classNames from 'classnames/bind';
import React from 'react';
import styles from './Avatar.module.css';

export interface Props {
  width?: string;
  imgUrl?: string;
  children?: any;
  style?: any;
  className: string;
}

function Avatar(props: Props) {
  let cx = classNames.bind(styles);
  const myStyle = {
    backgroundImage: `url('${props.imgUrl}')`,
    width: props.width,
    height: props.width,
    borderRadius: props.width,
  };
  const allStyle = { ...myStyle, ...props.style };
  return (
    <div className={cx(styles.avatar, props.className)} style={allStyle}></div>
  );
}

export default Avatar;
