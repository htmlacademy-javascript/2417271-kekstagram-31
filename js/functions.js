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

  if (adder.length > 1) {
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

// 5.16. Функции возвращаются

const converteStingTime = (stringTime) => {
  const normalizedTime = stringTime.split(':').map((item) => {
    item = Number(item);
    return item;
  });
  return normalizedTime;
};


const validateMeeting = (workdayStart = '', workdayEnd = '', meetingStart = '', meetingPeriod = 1) => {
  const normalizedWorkdayStart = converteStingTime(workdayStart);
  const normalizedWorkdayEnd = converteStingTime(workdayEnd);
  const normalizedMeetingStart = converteStingTime(meetingStart);

  // если время встречи до начала рабочего дня
  if (normalizedWorkdayStart[0] > normalizedMeetingStart[0]) {
    return false;
  } else if (normalizedWorkdayStart[0] === normalizedMeetingStart[0]) {
    if (normalizedWorkdayStart[1] > normalizedMeetingStart[1]) {
      return false;
    };
  };

  // если время встречи после окончания рабочего дня
  if (normalizedWorkdayEnd[0] < normalizedMeetingStart[0]) {
    return false;
  } else if (normalizedWorkdayEnd[0] === normalizedMeetingStart[0]) {
    if (normalizedWorkdayEnd[1] < normalizedMeetingStart[1]) {
      return false;
    };
  };

  // длительность встречи
  const workdayPeriodInMinuts = (normalizedWorkdayEnd[0] * 60 + normalizedWorkdayEnd[1]) - (normalizedWorkdayStart[0] * 60 + normalizedWorkdayStart[1]);
  const periodBeforeMeeting = (normalizedMeetingStart[0] * 60 + normalizedMeetingStart[1]) - (normalizedWorkdayStart[0] * 60 + normalizedWorkdayStart[1]);

  return (workdayPeriodInMinuts - periodBeforeMeeting) >= meetingPeriod;
};

// tests
// console.log(validateMeeting('08:00', '17:30', '14:00', 90)); // true
// console.log(validateMeeting('8:0', '10:0', '8:0', 120)); // true
// console.log(validateMeeting('08:00', '14:30', '14:00', 90)); // false
// console.log(validateMeeting('14:00', '17:30', '08:0', 90)); // false
// console.log(validateMeeting('8:00', '17:30', '08:00', 900)); // false

checkStringLength();
checkPalindrome('');
getNumber();
addToString();
validateMeeting();
