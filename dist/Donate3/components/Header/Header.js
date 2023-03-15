import classNames from 'classnames/bind';
import React from 'react';
import useNouns from "../../hooks/useNouns";
// import { ReactComponent as Avatar } from '../../images/avatar.svg';
import styles from "./Header.module.css";
function Header(props) {
  var base64Hash = useNouns(props.address);
  var cx = classNames.bind(styles);
  console.log('header::', props);
  return /*#__PURE__*/React.createElement("header", {
    className: cx(styles.header, {
      normalmode: props.normalmode && props.type === '2'
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.recipientinfo
  }, /*#__PURE__*/React.createElement("div", null, "Donate to ", props.name), /*#__PURE__*/React.createElement("div", null, "To:", props.address)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("fieldset", {
    className: styles.fieldset
  }, /*#__PURE__*/React.createElement("legend", null, base64Hash ? /*#__PURE__*/React.createElement("img", {
    className: styles.avatar,
    alt: "avatar",
    src: "data:image/svg+xml;base64,".concat(base64Hash)
  }) : /*#__PURE__*/React.createElement("img", {
    className: styles.avatar,
    src: "https://i.328888.xyz/2023/03/12/vk3wZ.png"
  })))));
}

//

export default Header;