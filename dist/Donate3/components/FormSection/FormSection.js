function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { useChainModal } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi';
import abi from "../../abi.json";
import { Donate3Context } from "../../context/Donate3Context";
import { useCreateDonate } from "../../hooks/useDonate";
import { ReactComponent as Eth } from "../../images/eth.svg";
import { ReactComponent as Loading } from "../../images/loading.svg";
import { ReactComponent as Switch } from "../../images/switch.svg";
import Success from "../Success/Success";
import styles from "./FormSection.module.css";
function FormSection() {
  var _useChainModal = useChainModal(),
    openChainModal = _useChainModal.openChainModal;
  var _useNetwork = useNetwork(),
    chain = _useNetwork.chain;
  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    amount = _useState2[0],
    setAmount = _useState2[1];
  var _useState3 = useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    message = _useState4[0],
    setMessage = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    donateCreateSuccess = _useState6[0],
    setDonateCreateSuccess = _useState6[1];
  var createDonate = useCreateDonate();
  var _React$useContext = React.useContext(Donate3Context),
    toAddress = _React$useContext.toAddress,
    fromAddress = _React$useContext.fromAddress,
    setShowSemiModal = _React$useContext.setShowSemiModal,
    isConnected = _React$useContext.isConnected,
    setShowLoading = _React$useContext.setShowLoading,
    showLoading = _React$useContext.showLoading,
    color = _React$useContext.color;
  var timeout = 5; // s

  var pid = 3;
  // let _merkleProof = '';
  // const amountIn = new BigNumber(amount * Math.pow(10, 18));
  var amountIn = amount && ethers.utils.parseEther(amount.toString());
  var bytesMsg = ethers.utils.toUtf8Bytes(message);
  var donateTokenArgs = [pid, amountIn, toAddress,
  // '0xb86EB6f8a39Db243a9ae544F180ef958dBA4e8b4',
  bytesMsg, [], {
    value: amountIn
  }];
  console.log('合约参数:', donateTokenArgs);
  var _usePrepareContractWr = usePrepareContractWrite({
      address: '0xbdEA24f8657eC8AD679b8bCcc761EcEE9600667e',
      abi: abi,
      functionName: 'donateToken',
      args: donateTokenArgs
    }),
    config = _usePrepareContractWr.config;
  var _useContractWrite = useContractWrite(config),
    transactionData = _useContractWrite.data,
    isSuccess = _useContractWrite.isSuccess,
    isError = _useContractWrite.isError,
    write = _useContractWrite.write;
  // console.log(
  //   '合约数据变更',
  //   transactionData,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   isIdle,
  // );

  useEffect(function () {
    if (isConnected) {
      setShowSemiModal(false);
      setShowLoading(false);
    } else {
      setShowSemiModal(true);
    }
  }, [isConnected]);
  useEffect(function () {
    if (donateCreateSuccess) {
      setTimeout(function () {
        setDonateCreateSuccess(false);
      }, timeout * 1000);
    }
  }, [donateCreateSuccess]);
  var asyncFunc = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var createDonateArgs, result;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            createDonateArgs = {
              chainType: 4 || (chain === null || chain === void 0 ? void 0 : chain.id) || 0,
              coinType: 0,
              //TODO, 这里我应该传什么？有哪些值？
              fromAddress: fromAddress,
              userId: fromAddress,
              hash: transactionData === null || transactionData === void 0 ? void 0 : transactionData.hash,
              // 这里我取 transaction hash
              // id: transactionData?.hash, // 这里的 id 我也暂时取了 hash，因为 hash 是唯一的
              message: message,
              // status: 0, // TODO 这里的状态有哪些值？
              toAddress: toAddress,
              usdValue: String(amount),
              // 这里是否可以支持 int 和 string 两种类型？
              value: String(amount) // 这里是否可以支持 int 和 string 两种类型？
            };
            _context.next = 3;
            return createDonate(createDonateArgs);
          case 3:
            result = _context.sent;
            setDonateCreateSuccess(true);
            console.log(result);
          case 6:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function asyncFunc() {
      return _ref.apply(this, arguments);
    };
  }();
  useEffect(function () {
    if (isSuccess) {
      setShowLoading(false);
      asyncFunc();
    }
    if (isError) {
      setShowLoading(false);
    }
  }, [isSuccess, isError]);

  // useEffect(() => {
  //   if (isIdle) {
  //     setShowLoading(false);
  //   }
  // }, [isIdle]);

  var handleDonate = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (isConnected) {
              setShowSemiModal(false);
              setShowLoading(true);
              write === null || write === void 0 ? void 0 : write();
              console.log(transactionData);
            } else {
              setShowSemiModal(true);
            }
          case 1:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function handleDonate() {
      return _ref2.apply(this, arguments);
    };
  }();
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
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "Payment Method"), /*#__PURE__*/React.createElement("div", {
    className: styles.methodinput
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.cointxt
  }, /*#__PURE__*/React.createElement(Eth, null), /*#__PURE__*/React.createElement("span", null, "ETH"), /*#__PURE__*/React.createElement("span", null, "Ethereum")), /*#__PURE__*/React.createElement("div", {
    className: styles.switch,
    onClick: openChainModal
  }, /*#__PURE__*/React.createElement(Switch, null))), /*#__PURE__*/React.createElement("div", {
    className: styles.footermark
  }, /*#__PURE__*/React.createElement("div", null, "icon"), /*#__PURE__*/React.createElement("div", null, "21.11ETH"), /*#__PURE__*/React.createElement("div", null, "0.01E = $127; 31GWEI = $0.75"))), /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement("div", null, "Message"), /*#__PURE__*/React.createElement("textarea", {
    placeholder: "Will be published on chain",
    value: message,
    onChange: function onChange(e) {
      setMessage(e.currentTarget.value);
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: styles.donate3btn,
    style: {
      background: color
    },
    disabled: !write,
    onClick: handleDonate
  }, showLoading ? /*#__PURE__*/React.createElement(Loading, null) : null, showLoading ? /*#__PURE__*/React.createElement("div", null, "Confirm in wallet...") : /*#__PURE__*/React.createElement("div", null, "DONATE3")
  // <div>≈$875.32</div>
  ), donateCreateSuccess ? /*#__PURE__*/React.createElement(Success, {
    timeout: timeout,
    setDonateCreateSuccess: setDonateCreateSuccess
  }) : null);
}

//

export default /*#__PURE__*/React.memo(FormSection);