function checkStringLength (string, lenght) {
  return string.length <= lenght;
}

function checkPalindrome (string) {
  let reverseString = '';
  string = string.replaceAll(' ', '');
  string = string.toLowerCase();

  for (let char = string.length - 1; char >= 0; char--) {
    reverseString += string[char];
  }

  return string === reverseString;
}

function getNumber (string) {
  if (string === Math.round(string)) {
    return Math.abs(string);
  }

  let numberString = '';

  if (typeof string !== 'string') {
    string = String(string);
  }

  for (let char = 0; char < string.length; char++) {
    const charString = parseInt(string[char], 10);

    if (!(Number.isNaN(charString))) {
      numberString += string[char];
    }
  }

  if (numberString === '') {
    numberString = NaN;
  }

  return Number(numberString);
}
