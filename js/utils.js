const body = document.querySelector('body');

const createElement = (tagName, className, textContent) => {
  const newEl = document.createElement(tagName);
  newEl.classList.add(className);
  if (textContent) {
    newEl.textContent = textContent;
  }
  return newEl;
};

const getRandomLimitInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) => array[getRandomLimitInteger(0, array.length - 1)];

const generateUniqueArray = (newArrayLenght, dataArr) => {
  const uniqueList = new Set();
  while (uniqueList.size < newArrayLenght) {
    uniqueList.add(getRandomArrayElement(dataArr));
  }
  return Array.from(uniqueList);
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

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  createElement,
  generateUniqueArray,
  isEscapeKey,
  showModal,
  closeModal,
  checkStringLength,
  debounce
};
