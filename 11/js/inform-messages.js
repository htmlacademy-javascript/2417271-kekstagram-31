import { isEscapeKey } from './utils.js';

const INFORM_SHOWTIME = 5000;
const ExchangeCondition = {
  GET_ERROR: {
    condition: 'dataError',
    errorText: 'Не удалось загрузить данные'
  },
  POST_ERROR: {
    condition: 'postError',
    errorText: 'Не удалось отправить форму'
  },
  POST_SUCCESS: {
    condition: 'postSuccsess'
  }
};

const body = document.querySelector('body');
const errorPostEl = document.querySelector('#error').content.querySelector('.error');
const succsessPostEl = document.querySelector('#success').content.querySelector('.success');
const errorGetDataEl = document.querySelector('#data-error').content.querySelector('.data-error');

let currentMessage;
let currentMessageButton;

const addMessage = (messageEl) => {
  currentMessage = messageEl;
  currentMessageButton = currentMessage.querySelector('button');
  body.append(currentMessage);
  currentMessageButton.addEventListener('click', onMessageButtonClick);
  currentMessage.addEventListener('click', onBackdropClick);
  document.addEventListener('keydown', onEscKeydown);
};

const closeMessage = () => {
  currentMessage.remove();
  currentMessageButton.removeEventListener('click', onMessageButtonClick);
  currentMessage.removeEventListener('click', onBackdropClick);
  document.removeEventListener('keydown', onEscKeydown);
};

function onMessageButtonClick() {
  closeMessage();
}

function onBackdropClick(evt) {
  if (evt.target.matches('.success')) {
    closeMessage();
  }
  if (evt.target.matches('.error')) {
    closeMessage();
  }
}

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

const addInformMessage = (condition) => {
  switch (condition) {
    case ('postError'):
      addMessage(errorPostEl);
      break;
    case ('postSuccsess'):
      addMessage(succsessPostEl);
      break;
    case ('dataError'):
      body.append(errorGetDataEl);
      setTimeout(() => {
        errorGetDataEl.remove();
      }, INFORM_SHOWTIME);
      break;
  }
};

export { ExchangeCondition, errorPostEl, addInformMessage };
