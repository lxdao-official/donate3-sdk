import React from 'react';
import { ReactComponent as Logo } from '../../images/logogray.svg';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.appfooter}>
      <span>Power by</span>
      <Logo className={styles.logo} />
      <span>Donate3</span>
    </footer>
  );
}

export default React.memo(Footer);
