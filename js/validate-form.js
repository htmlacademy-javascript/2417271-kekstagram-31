import { checkStringLength } from './utils.js';
import { sendData } from './api.js';
import { ExchangeCondition, addInformMessage } from './inform-messages.js';

const HASHTAG_LIMIT = 5;
const DESCRIPTION_LIMIT = 140;

const SubmitButtonText = {
  IDLE: 'ОПУБЛИКОВАТЬ',
  SENDING: 'ПУБЛИКУЕМ...'
};

const uploadImgFormEl = document.querySelector('#upload-select-image');
const editImgEl = uploadImgFormEl.querySelector('.img-upload__overlay');
const submitButtonEl = editImgEl.querySelector('#upload-submit');
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
  const hashtags = value.trim().toLowerCase().split(' ').filter(Boolean);
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

const blockSubmitButton = () => {
  submitButtonEl.disabled = true;
  submitButtonEl.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButtonEl.disabled = false;
  submitButtonEl.textContent = SubmitButtonText.IDLE;
};


const setEditFormSubmit = (onSuccess) => {
  uploadImgFormEl.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton();
      sendData(new FormData(uploadImgFormEl))
        .then(() => {
          onSuccess();
          addInformMessage(ExchangeCondition.POST_SUCCESS.condition);
        }
        )
        .catch(() => {
          addInformMessage(ExchangeCondition.POST_ERROR.condition);
        }
        )
        .finally(() => {
          unblockSubmitButton();
          pristine.reset();
        });
    }
  });
};


export { uploadImgFormEl, pristine, setEditFormSubmit };
