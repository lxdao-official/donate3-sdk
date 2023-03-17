import React from 'react';
import { ReactComponent as Logo } from "../../images/logo.svg";
import styles from "./Footer.module.css";
function Footer() {
  return /*#__PURE__*/React.createElement("footer", {
    className: styles.appfooter
  }, /*#__PURE__*/React.createElement("span", null, "Power by"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Logo, null)), /*#__PURE__*/React.createElement("span", null, "Donate3"));
}

//

export default Footer;