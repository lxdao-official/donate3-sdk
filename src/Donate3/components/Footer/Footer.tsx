import React from 'react';
import { ReactComponent as Logo } from '../../images/logo.svg';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.appfooter}>
      <span>Power by</span>
      <span>
        <Logo />
      </span>
      <span>Donate3</span>
    </footer>
  );
}

//

export default Footer;
