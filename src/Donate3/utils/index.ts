export const getElementPosition = (element: HTMLDivElement) => {
  const rect = element.getBoundingClientRect(); // 获取元素的位置信息
  const elementBottom = window.innerHeight - rect.bottom;
  const elementRight = window.innerWidth - rect.right;

  return {
    elementTop: rect.top,
    elementLeft: rect.left,
    elementRight,
    elementBottom,
  };
};
