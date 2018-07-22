const toNumArray = (dan) => {
  return new Array(9).fill(0).map((_, index) => dan * (index + 1));
};

export default toNumArray;
