const HASHTAG_LIMIT = 5;

const uploadImgFormEl = document.querySelector('#upload-select-image');
const editImgEl = uploadImgFormEl.querySelector('.img-upload__overlay');
const hashtagsFieldEl = editImgEl.querySelector('#hashtags');

const pristine = new Pristine(uploadImgFormEl, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const isInLimitHashtags = (value) => {
  const hashtags = value.split(' ');
  return hashtags.length <= HASHTAG_LIMIT;
};

const isUndoubleHashtags = (value) => {
  const hashtags = value.toLowerCase().split(' ');
  return (new Set(hashtags)).size === hashtags.length;
};

const isValidHashtags = (value) => {
  if (value === '') {
    return true;
  }
  const hashtagPattern = /^#[a-zа-яё0-9]{1,19}$/i;
  const hashtags = value.trim().split(' ');
  return hashtags.every((hashtag) => hashtagPattern.test(hashtag));
};

pristine.addValidator(hashtagsFieldEl, isInLimitHashtags, 'Превышено количество хэштегов');
pristine.addValidator(hashtagsFieldEl, isUndoubleHashtags, 'Хэштеги повторяются');
pristine.addValidator(hashtagsFieldEl, isValidHashtags, 'Введён невалидный хэштег');

const onEditFormSaubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadImgFormEl.submit();
  }
};

export {uploadImgFormEl, onEditFormSaubmit};
