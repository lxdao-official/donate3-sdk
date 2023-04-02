import { useConnectModal } from '@rainbow-me/rainbowkit';
import classNames from 'classnames/bind';
import React, { useContext } from 'react';
import { Donate3Context } from "../../context/Donate3Context";
import { ReactComponent as Loading } from "../../images/loading.svg";
import Footer from "../Footer/Footer";
import UserAvatar from "../UserAvatar/UserAvatar";
import styles from "./SemiModal.module.css";
function SemiModal() {
  var cx = classNames.bind(styles);
  var _useConnectModal = useConnectModal(),
    openConnectModal = _useConnectModal.openConnectModal;
  var _useContext = useContext(Donate3Context),
    showSemiModal = _useContext.showSemiModal,
    isConnected = _useContext.isConnected,
    setShowLoading = _useContext.setShowLoading,
    showLoading = _useContext.showLoading,
    color = _useContext.color;
  return /*#__PURE__*/React.createElement(React.Fragment, null, showSemiModal ? /*#__PURE__*/React.createElement("div", {
    className: cx(styles.semiModal, {
      in: !isConnected || showSemiModal
    }, {
      out: isConnected || !showSemiModal
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.bgmask
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.semiwrap
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.semiimg
  }, /*#__PURE__*/React.createElement("img", {
    className: styles.walleticon,
    src: 'https://i.328888.xyz/2023/03/12/vkcMH.png'
  }), /*#__PURE__*/React.createElement("img", {
    className: styles.btcicon,
    src: "https://i.328888.xyz/2023/03/12/vkRxF.png"
  })), /*#__PURE__*/React.createElement(UserAvatar, null), /*#__PURE__*/React.createElement("div", {
    className: styles.semidonatebtn,
    style: {
      background: color
    },
    onClick: function onClick() {
      setShowLoading(true);
      if (openConnectModal) {
        openConnectModal();
      }
    }
  }, showLoading ? /*#__PURE__*/React.createElement(Loading, null) : null, showLoading ? /*#__PURE__*/React.createElement("span", null, "Confirm in wallet...") : /*#__PURE__*/React.createElement("span", null, "Connect wallet for donation")), /*#__PURE__*/React.createElement(Footer, null))) : null);
}
export default /*#__PURE__*/React.memo(SemiModal);