import classNames from 'classnames/bind';
import React from 'react';
import { ZERO_ADDRESS } from '../../utils/const';
import { getNounsBase64 } from '../../utils/nouns';
import styles from './Avatar.module.css';

export interface Props {
  width?: string;
  address?: string;
  children?: any;
  style?: any;
  className?: string;
}

function Avatar(props: Props) {
  let cx = classNames.bind(styles);
  const myStyle = {
    // backgroundImage: `url('${props.address}')`,
    width: props.width,
    height: props.width,
    borderRadius: props.width,
  };
  // console.log('>>>>>', props.address, props.address?.length);
  const base64Hash =
    props.address?.length === 42
      ? getNounsBase64(props.address || ZERO_ADDRESS)
      : null;
  const allStyle = { ...myStyle, ...props.style };
  return (
    <>
      {base64Hash ? (
        <img
          className={cx(styles.avatar, props.className)}
          alt="avatar"
          src={`data:image/svg+xml;base64,${base64Hash}`}
          style={allStyle}
        />
      ) : (
        <img
          className={cx(styles.avatar, props.className)}
          style={allStyle}
          src="https://i.328888.xyz/2023/03/12/vk3wZ.png"
        ></img>
      )}
    </>
  );
}

export default React.memo(Avatar);
