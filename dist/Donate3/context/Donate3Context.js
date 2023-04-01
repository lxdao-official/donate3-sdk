function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import * as React from 'react';
import { useAccount } from 'wagmi';
import { useFetchDonors } from "../hooks/useDonate";
// import DonorResultMockData from '../Mock/DonorResult.json';
import { DONATE_TYPE, ZERO_ADDRESS } from "../utils/const";
export var Donate3Context = /*#__PURE__*/React.createContext({
  toAddress: ZERO_ADDRESS,
  fromAddress: ZERO_ADDRESS,
  type: DONATE_TYPE.NORMAL,
  color: '#764abc',
  total: 0,
  title: 'Donate3',
  showDonorList: false,
  setShowDonorList: function setShowDonorList() {},
  showSemiModal: false,
  setShowSemiModal: function setShowSemiModal() {},
  isConnected: false,
  showLoading: false,
  setShowLoading: function setShowLoading() {}
});
var Donate3Provider = function Donate3Provider(_ref) {
  var _donorList$records;
  var children = _ref.children,
    toAddress = _ref.toAddress,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? DONATE_TYPE.NORMAL : _ref$type,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? '#764abc' : _ref$color,
    _ref$title = _ref.title,
    title = _ref$title === void 0 ? 'Donate3' : _ref$title;
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    showDonorList = _React$useState2[0],
    setShowDonorList = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    showSemiModal = _React$useState4[0],
    setShowSemiModal = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    showLoading = _React$useState6[0],
    setShowLoading = _React$useState6[1];
  var _useAccount = useAccount(),
    fromAddress = _useAccount.address,
    isConnected = _useAccount.isConnected;
  // const [donorList, setDonorList] = React.useState<DonorResult>();
  var _useFetchDonors = useFetchDonors(toAddress, '1'),
    donorList = _useFetchDonors.donors;
  var total = donorList === null || donorList === void 0 ? void 0 : (_donorList$records = donorList.records) === null || _donorList$records === void 0 ? void 0 : _donorList$records.length;
  console.log('----------all context----------');
  console.log('type:', type);
  console.log('color:', color);
  console.log('isConnected:', isConnected);
  console.log('showDonorList:', showDonorList);
  console.log('showLoading:', showLoading);
  console.log('toAddress:', toAddress);
  console.log('fromAddress:', fromAddress);
  React.useEffect(function () {
    if (isConnected) {
      setShowSemiModal(false);
    } else {
      setShowSemiModal(true);
    }
  }, [isConnected]);
  return /*#__PURE__*/React.createElement(Donate3Context.Provider, {
    value: {
      total: total,
      donorList: donorList,
      toAddress: toAddress,
      fromAddress: fromAddress,
      title: title,
      type: type,
      color: color,
      showDonorList: showDonorList,
      setShowDonorList: setShowDonorList,
      showSemiModal: showSemiModal,
      setShowSemiModal: setShowSemiModal,
      isConnected: isConnected,
      showLoading: showLoading,
      setShowLoading: setShowLoading
    }
  }, children);
};
export default Donate3Provider;