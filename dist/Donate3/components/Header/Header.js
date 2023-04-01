import classNames from 'classnames/bind';
import React from 'react';
import { Donate3Context } from "../../context/Donate3Context";
import useNouns from "../../hooks/useNouns";
import { DONATE_TYPE } from "../../utils/const";
import TotalCircle from "../TotalCircle/TotalCircle";
import styles from "./Header.module.css";
function Header(_ref) {
  var normalmode = _ref.normalmode;
  var _React$useContext = React.useContext(Donate3Context),
    type = _React$useContext.type,
    toAddress = _React$useContext.toAddress,
    title = _React$useContext.title,
    setShowDonorList = _React$useContext.setShowDonorList;
  var base64Hash = useNouns(toAddress);
  var cx = classNames.bind(styles);
  return /*#__PURE__*/React.createElement("header", {
    className: cx(styles.header, {
      normalmode: normalmode && type === DONATE_TYPE.NORMAL
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.recipientinfo
  }, /*#__PURE__*/React.createElement("div", null, "Donate to ", title), /*#__PURE__*/React.createElement("div", null, "To:", toAddress && "".concat(toAddress.slice(0, 6), "...").concat(toAddress.slice(toAddress.length - 4)))), /*#__PURE__*/React.createElement("div", {
    className: styles.avatarwrap,
    onClick: function onClick() {
      setShowDonorList(true);
    }
  }, /*#__PURE__*/React.createElement("fieldset", {
    className: styles.fieldset
  }, /*#__PURE__*/React.createElement("legend", null, base64Hash ? /*#__PURE__*/React.createElement("img", {
    className: styles.avatar,
    alt: "avatar",
    src: "data:image/svg+xml;base64,".concat(base64Hash)
  }) : /*#__PURE__*/React.createElement("img", {
    className: styles.avatar,
    src: "https://i.328888.xyz/2023/03/12/vk3wZ.png"
  }))), normalmode ? null : /*#__PURE__*/React.createElement(TotalCircle, {
    size: 30,
    className: styles.total
  })));
}

//

export default /*#__PURE__*/React.memo(Header);