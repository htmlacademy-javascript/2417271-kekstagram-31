// import { addInformMessage } from './inform-messages.js';

// const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

// const Route = {
//   GET_DATA: '/data',
//   SEND_DATA: '/'
// };

// const Method = {
//   GET: 'GET',
//   POST: 'POST'
// };

// const ExchangeCondition = {
//   GET_ERROR: {
//     condition: 'dataError',
//     errorText: 'Не удалось загрузить данные'
//   },
//   POST_ERROR: {
//     condition: 'postError',
//     errorText: 'Не удалось отправить форму'
//   },
//   POST_SUCCESS: {
//     condition: 'postSuccsess'
//   }
// };

// const load = (route, method = Method.GET, body = null) =>
//   fetch(`${BASE_URL}${route}`, { method, body })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error();
//       }
//       return response.json();
//     })
//     .catch(() => {

//     });

// const getData = () => { };

// const sendData = () => { };
