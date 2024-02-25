const checkStringLength = (string = '', lenght = 1) => string.length <= lenght;

const checkPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();
  const reverseString = normalizedString.split('').reverse().join('');

  return normalizedString === reverseString;
};

const getNumber = (string) => {
  if (string === Math.round(string)) {
    return Math.abs(string);
  }

  let numberString = '';
  let normalizedString = string;

  if (typeof string !== 'string') {
    normalizedString = String(string);
  }

  for (let char = 0; char < normalizedString.length; char++) {

    if (!(Number.isNaN(parseInt(normalizedString[char], 10)))) {
      numberString += normalizedString[char];
    }
  }

  if (numberString === '') {
    numberString = NaN;
  }

  return Number(numberString);
};

const addToString = (string = '', minLength = 1, adder = '') => {
  if (string.length >= minLength) {
    return string;
  }

  let addedString = '';
  const adderLength = minLength - string.length;
  const amountFullAdder = Math.floor(adderLength / adder.length);
  let adderChars = adder;

  if (adder.length > 0) {
    adderChars = adder.split('');
  }

  for (let i = 0; i < (adderLength - adder.length * amountFullAdder); i++) {
    addedString += adderChars[i];
  }

  while (addedString.length < adderLength) {
    addedString += adder;
  }

  addedString += string;

  return addedString;
};

checkStringLength();
checkPalindrome('');
getNumber();
addToString();
