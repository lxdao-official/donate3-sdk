import classNames from 'classnames/bind';
import React from 'react';
import { Donate3Context } from "../../context/Donate3Context";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { DONATE_TYPE } from "../../utils/const";
import styles from "./DonateButton.module.css";
function DonateButton() {
  var cx = classNames.bind(styles);
  var _React$useContext = React.useContext(Donate3Context),
    type = _React$useContext.type,
    toAddress = _React$useContext.toAddress,
    color = _React$useContext.color;
  var wrapStyles = cx(styles.wrap, {
    largewrap: type === DONATE_TYPE.NORMAL
  }, {
    tinywrap: type === DONATE_TYPE.FLOAT
  });
  return /*#__PURE__*/React.createElement("div", {
    className: wrapStyles,
    style: {
      background: color
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    className: styles.img
  }), /*#__PURE__*/React.createElement("span", null, "Donate3"), type === DONATE_TYPE.NORMAL ? /*#__PURE__*/React.createElement("span", null, toAddress && "".concat(toAddress.slice(0, 6), "...").concat(toAddress.slice(toAddress.length - 4))) : null);
}
export default /*#__PURE__*/React.memo(DonateButton);