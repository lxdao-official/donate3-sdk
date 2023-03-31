import classNames from 'classnames/bind';
import React from 'react';
import { Donate3Context } from "../../context/Donate3Context";
import { DONATE_TYPE } from "../../utils/const";
import Avatar from "../Avatar/Avatar";
import TotalCircle from "../TotalCircle/TotalCircle";
import styles from "./UserAvatar.module.css";
function UserAvatar(props) {
  var cx = classNames.bind(styles);
  var _React$useContext = React.useContext(Donate3Context),
    type = _React$useContext.type,
    donorList = _React$useContext.donorList,
    total = _React$useContext.total;
  var makeDonateUserAvatar = function makeDonateUserAvatar() {
    var _donorList$result;
    if (!donorList) return;
    var dom = [];
    var records = donorList === null || donorList === void 0 ? void 0 : (_donorList$result = donorList.result) === null || _donorList$result === void 0 ? void 0 : _donorList$result.records.slice(0, 5);
    dom = records.map(function (item, index) {
      return /*#__PURE__*/React.createElement(Avatar, {
        key: index,
        address: item.fromAddress,
        width: '40px'
      });
    });
    dom.push( /*#__PURE__*/React.createElement(TotalCircle, {
      key: 'lastitem',
      size: 40,
      className: styles.total
    }));
    return dom;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: cx({
      normalmode: props.normalmode && type === DONATE_TYPE.NORMAL
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.donateusers
  }, makeDonateUserAvatar()), type === DONATE_TYPE.FLOAT ? /*#__PURE__*/React.createElement("div", {
    className: styles.donateuserdec
  }, "\u5DF2\u6709", total, "\u4EBA\u5411\u4ED6\u6350\u8D60") : null);
}
export default /*#__PURE__*/React.memo(UserAvatar);