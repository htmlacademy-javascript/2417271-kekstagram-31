import { checkStringLength } from './utils.js';

const HASHTAG_LIMIT = 5;
const DESCRIPTION_LIMIT = 140;

const uploadImgFormEl = document.querySelector('#upload-select-image');
const editImgEl = uploadImgFormEl.querySelector('.img-upload__overlay');
const hashtagsFieldEl = editImgEl.querySelector('#hashtags');
const descriptionFieldEl = editImgEl.querySelector('#description');

const pristine = new Pristine(uploadImgFormEl, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

let errorMessage;

const isValidHashtags = (value) => {
  if (value === '') {
    errorMessage = '';
    return true;
  }
  const hashtags = value.trim().toLowerCase().split(' ');
  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
  if (hashtags.length > HASHTAG_LIMIT) {
    errorMessage = 'Превышено количество хэштегов';
    return false;
  }
  if ((new Set(hashtags)).size !== hashtags.length) {
    errorMessage = 'Хэштеги повторяются';
    return false;
  }
  if (!hashtags.every((hashtag) => hashtagPattern.test(hashtag))) {
    errorMessage = 'Введён невалидный хэштег';
    return false;
  }
  errorMessage = '';
  return true;
};

const getErrorMessage = () => errorMessage;

const isValidDescription = (value) => checkStringLength(value, DESCRIPTION_LIMIT);

pristine.addValidator(hashtagsFieldEl, isValidHashtags, getErrorMessage);
pristine.addValidator(descriptionFieldEl, isValidDescription, 'Длина комментария больше 140 символов');

const onEditFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadImgFormEl.submit();
  }
};

export { uploadImgFormEl, hashtagsFieldEl, descriptionFieldEl, onEditFormSubmit };
