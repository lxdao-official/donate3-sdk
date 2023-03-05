import React from "react";
import avatar from "../../images/avatar.svg";
import useNouns from "../../hooks/useNouns";
import styles from "./Header.module.css";

export interface HeaderProps {
  name: string;
  address: string;
}

function Header(props: HeaderProps) {
  const base64Hash = useNouns(props.address);
  return (
    <header className={styles.header}>
      <div className={styles.RecipientInfo}>
        <div>Donate to {props.name}</div>
        <div>To:{props.address}</div>
      </div>
      <div>
        {base64Hash ? (
          <img
            className={styles.Avatar}
            alt="avatar"
            src={`data:image/svg+xml;base64,${base64Hash}`}
          />
        ) : (
          <img src={avatar} className={styles.Avatar} alt="avatar" />
        )}
      </div>
    </header>
  );
}

//

export default Header;
