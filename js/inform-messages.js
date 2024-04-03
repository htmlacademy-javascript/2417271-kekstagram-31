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

const addInformMessage = (condition) => {
  switch (condition) {
    case ('postError'):
      body.append(errorPostEl);
      break;
    case ('postSuccsess'):
      body.append(succsessPostEl);
      break;
    case ('dataError'):
      body.append(errorGetDataEl);
      setTimeout(() => {
        errorGetDataEl.remove();
      }, INFORM_SHOWTIME);
      break;
  }
};

export { ExchangeCondition, addInformMessage };
