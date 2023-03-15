export var getElementPosition = function getElementPosition(element) {
  var rect = element.getBoundingClientRect(); // 获取元素的位置信息
  var elementBottom = window.innerHeight - rect.bottom;
  var elementRight = window.innerWidth - rect.right;
  return {
    elementTop: rect.top,
    elementLeft: rect.left,
    elementRight: elementRight,
    elementBottom: elementBottom
  };
};