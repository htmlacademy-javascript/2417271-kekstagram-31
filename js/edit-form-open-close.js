import { isEscapeKey, showModal, closeModal } from './utils.js';
import {
  scaleSmallerButtonEl,
  scaleBiggerButtonEl,
  resetScale,
  onScaleSmallerClick,
  onScaleBiggererClick
} from './edit-scale-inp.js';

const uploadImgFormEl = document.querySelector('#upload-select-image');
const uploadImgButtonEl = uploadImgFormEl.querySelector('#upload-file');
const editImgEl = uploadImgFormEl.querySelector('.img-upload__overlay');
const closeEditImgButtonEl = editImgEl.querySelector('.img-upload__cancel');
const editorPreview = editImgEl.querySelector('.img-upload__preview').querySelector('img');

const showFullscreenEditor = () => {
  // console.log(uploadImgButtonEl.value); - как-то подставим это фото в editorPreview
  document.addEventListener('keydown', onEscKeydown);
  closeEditImgButtonEl.addEventListener('click', onCloseButtonClick);
  scaleSmallerButtonEl.addEventListener('click', onScaleSmallerClick);
  scaleBiggerButtonEl.addEventListener('click', onScaleBiggererClick);
};

const closeFullscreenEditor = () => {
  uploadImgFormEl.reset();
  closeModal(editImgEl);
  resetScale();
  document.removeEventListener('keydown', onEscKeydown);
  closeEditImgButtonEl.removeEventListener('click', onCloseButtonClick);
  scaleSmallerButtonEl.removeEventListener('click', onScaleSmallerClick);
  scaleBiggerButtonEl.removeEventListener('click', onScaleBiggererClick);
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

export {
  uploadImgFormEl,
  editorPreview
};
