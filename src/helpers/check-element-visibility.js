const checkVisible = (elm) => {
  const element = document.getElementsByClassName(elm)[0];
  const rect = element.getBoundingClientRect();
  const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
};

export default checkVisible;
