// вспомогательные функции
const getRandomLimitInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomUniqueInteger = (min, max) => {
  const valuesCollection = [];
  return function () {
    if (valuesCollection.length >= (max - min + 1)) {
      return null;
    }
    let currentValue = getRandomLimitInteger(min, max);
    while (valuesCollection.includes(currentValue)) {
      currentValue = getRandomLimitInteger(min, max);
    }
    valuesCollection.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (array) => array[getRandomLimitInteger(0, array.length - 1)];

export {getRandomLimitInteger, getRandomUniqueInteger, getRandomArrayElement};
