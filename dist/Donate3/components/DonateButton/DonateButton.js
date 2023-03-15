import classNames from 'classnames/bind';
import React from 'react';
import { ReactComponent as LogoWhite } from "../../images/logowhite.svg";
import styles from "./DonateButton.module.css";
function DonateButton(props) {
  var cx = classNames.bind(styles);
  var wrapStyles = cx(styles.wrap, {
    largewrap: props.type === '2'
  }, {
    tinywrap: props.type === '1'
  });
  return /*#__PURE__*/React.createElement("div", {
    className: wrapStyles
  }, /*#__PURE__*/React.createElement(LogoWhite, {
    className: styles.img
  }), /*#__PURE__*/React.createElement("span", null, "Donate3"), props.type === '2' ? /*#__PURE__*/React.createElement("span", null, 'address todo') : null);
}
export default DonateButton;