function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { useAccount, useContract, useContractWrite, useNetwork, usePrepareContractWrite, useProvider } from 'wagmi';
// import { ReactComponent as SemiLogo } from '../../images/semilogo';
import abi from "../../abi.json";
import { ReactComponent as Eth } from "../../images/eth.svg";
import { ReactComponent as Switch } from "../../images/switch.svg";
import Footer from "../Footer/Footer";
import UserAvatar from "../UserAvatar/UserAvatar";
import styles from "./FormSection.module.css";

// https://imgloc.com/i/vk3wZ  https://i.328888.xyz/2023/03/12/vk3wZ.png  avatar
// https://imgloc.com/i/vkRxF  https://i.328888.xyz/2023/03/12/vkRxF.png  btc
// https://imgloc.com/i/vkcMH  https://i.328888.xyz/2023/03/12/vkcMH.png  wallet

function FormSection(props) {
  var _useConnectModal = useConnectModal(),
    openConnectModal = _useConnectModal.openConnectModal;
  var _useChainModal = useChainModal(),
    openChainModal = _useChainModal.openChainModal;
  var _useNetwork = useNetwork(),
    chain = _useNetwork.chain,
    chains = _useNetwork.chains;
  var _useAccount = useAccount(),
    isConnected = _useAccount.isConnected;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showSemiModal = _useState2[0],
    setShowSemiModal = _useState2[1];
  var _useState3 = useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    amount = _useState4[0],
    setAmount = _useState4[1];
  var _useState5 = useState(''),
    _useState6 = _slicedToArray(_useState5, 2),
    message = _useState6[0],
    setMessage = _useState6[1];
  var provider = useProvider();
  var contract = useContract({
    address: '0xb3E988ec1b8c53cd4915Ec20C95F3103d984ebE7',
    abi: abi,
    signerOrProvider: provider
  });
  var _usePrepareContractWr = usePrepareContractWrite({
      address: '0xb3E988ec1b8c53cd4915Ec20C95F3103d984ebE7',
      abi: abi,
      functionName: 'mint'
    }),
    config = _usePrepareContractWr.config;
  var _useContractWrite = useContractWrite(config),
    data = _useContractWrite.data,
    isLoading = _useContractWrite.isLoading,
    isSuccess = _useContractWrite.isSuccess,
    write = _useContractWrite.write;
  var cx = classNames.bind(styles);
  useEffect(function () {
    if (isConnected) {
      setShowSemiModal(false);
    } else {
      setShowSemiModal(true);
    }
  }, []);
  useEffect(function () {
    console.log('合约数据变更', data, isLoading, isSuccess);
  }, [data, isLoading, isSuccess]);
  var handleDonate = function handleDonate() {
    if (isConnected) {
      setShowSemiModal(false);
      var _data = {
        amount: amount,
        message: message
      };
      console.log(_data, chain, chains, contract);
      debugger;
      write === null || write === void 0 ? void 0 : write();
      // TODO 调用合约
    } else {
      setShowSemiModal(true);
    }
  };
  var handleEthAmount = function handleEthAmount(event) {
    var _event$target, _event$target$dataset;
    event.currentTarget.querySelectorAll('div').forEach(function (item) {
      item.classList.remove(styles.active);
    });
    // @ts-ignore
    var amount = ((_event$target = event.target) === null || _event$target === void 0 ? void 0 : (_event$target$dataset = _event$target.dataset) === null || _event$target$dataset === void 0 ? void 0 : _event$target$dataset.amount) || 0;
    event.target.classList.add(styles.active);
    setAmount(amount);
  };
  var handleManualAmount = function handleManualAmount(event) {
    setAmount(Number(event.target.value));
  };
  return /*#__PURE__*/React.createElement("section", {
    className: styles.appcontent
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "Payment Method"), /*#__PURE__*/React.createElement("div", {
    className: styles.methodinput
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.eth
  }, /*#__PURE__*/React.createElement(Eth, null)), /*#__PURE__*/React.createElement("div", null, "ETH"), /*#__PURE__*/React.createElement("input", {
    placeholder: "Ethereum"
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.switch,
    onClick: openChainModal
  }, /*#__PURE__*/React.createElement(Switch, null))), /*#__PURE__*/React.createElement("div", {
    className: styles.footermark
  }, /*#__PURE__*/React.createElement("div", null, "icon"), /*#__PURE__*/React.createElement("div", null, "21.11ETH"), /*#__PURE__*/React.createElement("div", null, "0.01E = $127; 31GWEI = $0.75")), /*#__PURE__*/React.createElement("div", {
    className: styles.shortcutoption,
    onClick: handleEthAmount
  }, /*#__PURE__*/React.createElement("div", {
    "data-amount": 0.001
  }, "0.001 ETH"), /*#__PURE__*/React.createElement("div", {
    "data-amount": 0.01
  }, "0.01 ETH"), /*#__PURE__*/React.createElement("div", {
    "data-amount": 0.5
  }, "0.5 ETH")), /*#__PURE__*/React.createElement("fieldset", {
    className: styles.fieldset
  }, /*#__PURE__*/React.createElement("legend", null, /*#__PURE__*/React.createElement("span", null, "OR"))), /*#__PURE__*/React.createElement("input", {
    className: styles.pricebtn,
    placeholder: "Enter Price Manually",
    value: amount,
    onChange: handleManualAmount
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.msg
  }, /*#__PURE__*/React.createElement("div", null, "Message"), /*#__PURE__*/React.createElement("input", {
    placeholder: "Will be published on chain",
    multiple: true,
    value: message,
    onChange: function onChange(e) {
      setMessage(e.currentTarget.value);
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: styles.donate3btn
    // disabled={!write}
    ,
    onClick: handleDonate
  }, /*#__PURE__*/React.createElement("div", null, "DONATE3"), /*#__PURE__*/React.createElement("div", null, "\u2248$875.32")), showSemiModal ? /*#__PURE__*/React.createElement("div", {
    className: cx(styles.semiModal, {
      in: !isConnected || showSemiModal
    }, {
      out: isConnected || !showSemiModal
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.bgmask,
    onClick: function onClick() {
      setShowSemiModal(false);
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.semiwrap
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.semiimg
  }, /*#__PURE__*/React.createElement("img", {
    className: styles.walleticon
    // src="https://i.328888.xyz/2023/03/12/vkcMH.png"
    ,
    src: 'https://i.328888.xyz/2023/03/12/vkcMH.png'
  }), /*#__PURE__*/React.createElement("img", {
    className: styles.btcicon,
    src: "https://i.328888.xyz/2023/03/12/vkRxF.png"
  })), /*#__PURE__*/React.createElement(UserAvatar, {
    type: props.type
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.semidonatebtn,
    onClick: openConnectModal
  }, "Connect wallet for donation"), /*#__PURE__*/React.createElement(Footer, null))) : null);
}

//

export default FormSection;