import React from 'react';
import { ReactComponent as Logo } from '../../images/logo.svg';
import styles from './FloatButton.module.css';
import classNames from 'classnames/bind';

import { ReactComponent as Close } from './images/close.svg';
import { ReactComponent as LogoWhite } from './images/logowhite.svg';

function FloatButton(props) {
  return (
    <div className={dialogStyles} onClick={handleSwitchDialog}>
        {showForm ? (
          <Close className={styles.closeimg}></Close>
        ) : (
          <>
            <LogoWhite className={styles.tinyimg}></LogoWhite>
            <span className={styles.tinytxt}>Donate3</span>
          </>
        )}
      </div>
}

//

export default FloatButton;
