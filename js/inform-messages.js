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
      break;
  }
};

export { addInformMessage };
