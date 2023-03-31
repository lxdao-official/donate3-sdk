import classNames from 'classnames/bind';
import React, { useContext } from 'react';
import { Donate3Context } from "../../context/Donate3Context";
import { ReactComponent as Close } from "../../images/close.svg";
import { ReactComponent as SortBg } from "../../images/sortbg.svg";
import Avatar from "../Avatar/Avatar";
import TotalCircle from "../TotalCircle/TotalCircle";
import styles from "./DonorList.module.css";
function DonorList(_ref) {
  var setShowDonorList = _ref.setShowDonorList;
  var cx = classNames.bind(styles);
  var _useContext = useContext(Donate3Context),
    donorList = _useContext.donorList;
  var makeDonateDonorAvatar = function makeDonateDonorAvatar(datas) {
    var _datas$result;
    if (!datas) return;
    var dom = [];
    var records = datas === null || datas === void 0 ? void 0 : (_datas$result = datas.result) === null || _datas$result === void 0 ? void 0 : _datas$result.records;
    dom = records === null || records === void 0 ? void 0 : records.map(function (item, index) {
      return /*#__PURE__*/React.createElement(Avatar, {
        key: index,
        address: item.fromAddress,
        className: styles.itemavatar
      });
    });
    dom.push( /*#__PURE__*/React.createElement(TotalCircle, {
      key: 'lastitem',
      size: 40,
      className: styles.lastavatar
    }));
    return dom;
  };
  var makeTopDom = function makeTopDom(datas) {
    var _datas$result2, _datas$result2$record;
    if (!datas) return;
    var dom = [];
    var records = datas === null || datas === void 0 ? void 0 : (_datas$result2 = datas.result) === null || _datas$result2 === void 0 ? void 0 : (_datas$result2$record = _datas$result2.records) === null || _datas$result2$record === void 0 ? void 0 : _datas$result2$record.slice(0, 3);
    dom = records === null || records === void 0 ? void 0 : records.map(function (item, index) {
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: styles.topitem
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.topimg
      }, /*#__PURE__*/React.createElement(Avatar, {
        address: item.fromAddress,
        width: '60px'
      })), /*#__PURE__*/React.createElement("div", {
        className: styles.amount
      }, "$", item.usdValue), /*#__PURE__*/React.createElement("div", {
        className: styles.count
      }, "\u6350\u8D60", item.value, "\u6B21"));
    });
    return dom;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrap)
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.content)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.header
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, /*#__PURE__*/React.createElement("span", {
    className: styles.titletxt
  }, "Donor"), /*#__PURE__*/React.createElement(Close, {
    style: {
      transform: 'scale(0.5)'
    },
    onClick: function onClick() {
      setShowDonorList(false);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.top
  }, makeTopDom(donorList), /*#__PURE__*/React.createElement("div", {
    className: styles.bg
  }, /*#__PURE__*/React.createElement(SortBg, null)))), /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, makeDonateDonorAvatar(donorList))));
}
export default /*#__PURE__*/React.memo(DonorList);