import {checkStringLength} from './utils.js';

const uploadImgFormEl = document.querySelector('#upload-select-image');

const editImgEl = uploadImgFormEl.querySelector('.img-upload__overlay');
const hashtagsFieldEl = editImgEl.querySelector('#hashtags');
const describtionFieldEl = editImgEl.querySelector('#description');

const pristine = new Pristine(uploadImgFormEl, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const hashtagValidate = (hashtag) => {
  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
  // console.log('паттерн');
  return hashtagPattern.test(hashtag);
};

const hashtagsValidate = (value) => {
  if (value === '') {
    return true;
  }
  const hashtags = value.split(' ');
  if (hashtags.length > 5) {
    return false;
  }
  if ((new Set(hashtags)).size !== hashtags.length) {
    return false;
  }
  return hashtags.forEach((hashtag) => hashtagValidate(hashtag));
};

// const describeHashtagError = () => {
// // введён невалидный хэштег;
// // превышено количество хэштегов;
// // хэштеги повторяются;
// };

const describtionValidate = (value) => checkStringLength(value, 140);

pristine.addValidator(hashtagsFieldEl, hashtagsValidate, 'Что-то пошло не так');
pristine.addValidator(describtionFieldEl, describtionValidate, 'Длина комментария больше 140 символов'); // ??? валидировать только через JS или +HTML?

uploadImgFormEl.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadImgFormEl.submit();
  }
});
