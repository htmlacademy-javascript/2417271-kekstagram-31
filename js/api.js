import { ExchangeCondition } from './inform-messages.js';

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/'
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => load(Route.GET_DATA, ExchangeCondition.GET_ERROR.errorText);

const sendData = () => load(Route.SEND_DATA, ExchangeCondition.POST_ERROR.errorText);

export { getData, sendData };
