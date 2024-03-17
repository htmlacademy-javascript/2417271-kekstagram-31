import { isEscapeKey, showModal, closeModal } from './utils.js';

const uploadImgFormEl = document.querySelector('#upload-select-image');
const uploadImgButtonEl = uploadImgFormEl.querySelector('#upload-file');
const editImgEl = uploadImgFormEl.querySelector('.img-upload__overlay');
const closeEditImgButtonEl = editImgEl.querySelector('.img-upload__cancel');

const showFullscreenEditor = () => {
  // console.log(uploadImgButtonEl.value); - как-то подставим это фото в editorPreview
  document.addEventListener('keydown', onEscKeydown);
  closeEditImgButtonEl.addEventListener('click', onCloseButtonClick);
};

const closeFullscreenEditor = () => {
  uploadImgFormEl.reset();
  closeModal(editImgEl);
  document.removeEventListener('keydown', onEscKeydown);
  closeEditImgButtonEl.removeEventListener('click', onCloseButtonClick);
};

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (editImgEl.querySelector('.text__hashtags:focus') || editImgEl.querySelector('.text__description:focus')) {
      evt.stopPropagation();
    } else {
      closeFullscreenEditor();
    }
  }
}

function onCloseButtonClick() {
  closeFullscreenEditor();
}

function onuploudButtionClick(evt) {
  evt.preventDefault();
  showModal(editImgEl);
  showFullscreenEditor();
}

uploadImgButtonEl.addEventListener('change', onuploudButtionClick);

