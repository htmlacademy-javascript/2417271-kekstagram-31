import { isEscapeKey, showModal, closeModal } from './utils.js';
import { uploadImgFormEl, onEditFormSaubmit } from './validate-form.js';
import { editImgEl, resetScale, onScaleSmallerClick, onScaleBiggererClick, resetEffect, onEffectChange } from './edit-upload-img.js';

const uploadImgButtonEl = uploadImgFormEl.querySelector('#upload-file');
const closeEditImgButtonEl = editImgEl.querySelector('.img-upload__cancel');
const scaleSmallerButtonEl = editImgEl.querySelector('.scale__control--smaller');
const scaleBiggerButtonEl = editImgEl.querySelector('.scale__control--bigger');
const effectsListEl = editImgEl.querySelector('.effect-level__slider');

const showFullscreenEditor = () => {
  // console.log(uploadImgButtonEl.value); - как-то подставим это фото в editorPreview
  document.addEventListener('keydown', onEscKeydown);
  closeEditImgButtonEl.addEventListener('click', onCloseButtonClick);
  scaleSmallerButtonEl.addEventListener('click', onScaleSmallerClick);
  scaleBiggerButtonEl.addEventListener('click', onScaleBiggererClick);
  effectsListEl.addEventListener('click', onEffectChange);
  uploadImgFormEl.addEventListener('submit', onEditFormSaubmit);
};

const closeFullscreenEditor = () => {
  uploadImgFormEl.reset();
  closeModal(editImgEl);
  resetScale();
  resetEffect();
  document.removeEventListener('keydown', onEscKeydown);
  closeEditImgButtonEl.removeEventListener('click', onCloseButtonClick);
  scaleSmallerButtonEl.removeEventListener('click', onScaleSmallerClick);
  scaleBiggerButtonEl.removeEventListener('click', onScaleBiggererClick);
  effectsListEl.removeEventListener('click', onEffectChange);
  uploadImgFormEl.removeEventListener('submit', onEditFormSaubmit);
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
