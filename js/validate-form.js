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

const isInLimitHashtags = (value) => {
  const hashtags = value.split(' ');
  return hashtags.length <= 5;
};

const isUndoubleHashtags = (value) => {
  const hashtags = value.toLowerCase().split(' ');
  return (new Set(hashtags)).size === hashtags.length;
};

const isValidHashtags = (value) => {
  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/gi;
  const hashtags = value.split(' ');
  // работает некорректно: при введении второго хэштэга продолжает считать его ошибочным, даже когда после # введены валидные символы
  const invalidEl = hashtags.find((hashtag) => !hashtagPattern.test(hashtag));
  if (!invalidEl || value === '') {
    return true;
  }
  return false;
};

pristine.addValidator(hashtagsFieldEl, isInLimitHashtags, 'Превышено количество хэштегов');
pristine.addValidator(hashtagsFieldEl, isUndoubleHashtags, 'Хэштеги повторяются');
pristine.addValidator(hashtagsFieldEl, isValidHashtags, 'Введён невалидный хэштег');
pristine.addValidator(describtionFieldEl);

uploadImgFormEl.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadImgFormEl.submit();
  }
});
