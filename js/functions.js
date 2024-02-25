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

checkStringLength();
checkPalindrome('');
getNumber();
