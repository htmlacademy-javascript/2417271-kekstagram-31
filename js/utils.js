const body = document.querySelector('body');

const getRandomLimitInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// В течение раздела нас заметно направляли в сторону написания такой функции, так что пока оставляю на случай, если понадобится где-то позже
// const getRandomUniqueInteger = (min, max) => {
//   const valuesCollection = [];
//   return function () {
//     if (valuesCollection.length >= (max - min + 1)) {
//       return null;
//     }
//     let currentValue = getRandomLimitInteger(min, max);
//     while (valuesCollection.includes(currentValue)) {
//       currentValue = getRandomLimitInteger(min, max);
//     }
//     valuesCollection.push(currentValue);
//     return currentValue;
//   };
// };

const createUniqueIdGenerator = () => {
  let id = 1;
  return () => {
    const currentId = id;
    id++;
    return currentId;
  };
};

const getRandomArrayElement = (array) => array[getRandomLimitInteger(0, array.length - 1)];

const createElement = (tagName, className, textContent) => {
  const newEl = document.createElement(tagName);
  newEl.classList.add(className);
  if (textContent) {
    newEl.textContent = textContent;
  }
  return newEl;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const showModal = (modalElement) => {
  modalElement.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeModal = (modalElement) => {
  modalElement.classList.add('hidden');
  body.classList.remove('modal-open');
};

const checkStringLength = (string = '', lenght = 1) => string.length <= lenght;

export {getRandomLimitInteger, createUniqueIdGenerator, getRandomArrayElement, createElement, isEscapeKey, showModal, closeModal, checkStringLength};
