import classNames from 'classnames/bind';
import React from 'react';
import { ReactComponent as LogoWhite } from '../../images/logowhite.svg';
import styles from './DonateButton.module.css';

function DonateButton(props: { type: string }) {
  let cx = classNames.bind(styles);
  let wrapStyles = cx(
    styles.wrap,
    {
      largewrap: props.type === '2',
    },
    {
      tinywrap: props.type === '1',
    },
  );
  return (
    <div className={wrapStyles}>
      <LogoWhite className={styles.img}></LogoWhite>
      <span>Donate3</span>
      {props.type === '2' ? <span>{'address todo'}</span> : null}
    </div>
  );
}

export default DonateButton;
