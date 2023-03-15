import classNames from 'classnames/bind';
import React from 'react';
import styles from "./UserAvatar.module.css";
function UserAvatar(props) {
  var makeDonateUserAvatar = function makeDonateUserAvatar() {
    var dom = [];
    var url = 'https://i.imgur.com/RbcuN95.jpeg';
    var myStyle = {
      backgroundImage: "url('".concat(url, "')"),
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };
    dom = ['aa', 'bb', 'cc', 'cc1', 'cc2', 'cc3'].map(function (item) {
      return /*#__PURE__*/React.createElement("div", {
        key: item,
        className: styles.donateuseravatar,
        style: myStyle
      });
    });
    dom.push( /*#__PURE__*/React.createElement("div", {
      key: 'lastitem',
      className: styles.donateuseravatar
    }, "190"));
    return dom;
  };
  var cx = classNames.bind(styles);
  return /*#__PURE__*/React.createElement("div", {
    className: cx({
      normalmode: props.normalmode && props.type === '2'
    })
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.donateusers
  }, makeDonateUserAvatar()), props.type === '1' ? /*#__PURE__*/React.createElement("div", {
    className: styles.donateuserdec
  }, "\u5DF2\u6709198\u4EBA\u5411\u4ED6\u6350\u8D60") : null);
}
export default UserAvatar;