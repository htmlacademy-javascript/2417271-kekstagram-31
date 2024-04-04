const body = document.querySelector('body');

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

export {
  createElement,
  isEscapeKey,
  showModal,
  closeModal,
  checkStringLength
};
