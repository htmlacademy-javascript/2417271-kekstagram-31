import { isEscapeKey, showModal, closeModal } from './utils.js';
import { errorPostEl } from './inform-messages.js';
import {
  uploadImgButtonEl,
  editImgEl,
  addPreview,
  resetScale,
  onScaleSmallerClick,
  onScaleBiggererClick,
  resetEffect,
  onEffectChange
} from './edit-upload-img.js';
import { pristine } from './validate-form.js';

const uploadImgFormEl = document.querySelector('#upload-select-image');

const closeEditImgButtonEl = editImgEl.querySelector('.img-upload__cancel');
const scaleSmallerButtonEl = editImgEl.querySelector('.scale__control--smaller');
const scaleBiggerButtonEl = editImgEl.querySelector('.scale__control--bigger');
const hashtagsFieldEl = editImgEl.querySelector('#hashtags');
const descriptionFieldEl = editImgEl.querySelector('#description');

const showFullscreenEditor = () => {
  resetEffect();
  document.addEventListener('keydown', onEscKeydown);
  closeEditImgButtonEl.addEventListener('click', onCloseButtonClick);
  scaleSmallerButtonEl.addEventListener('click', onScaleSmallerClick);
  scaleBiggerButtonEl.addEventListener('click', onScaleBiggererClick);
  uploadImgFormEl.addEventListener('change', onEffectChange);
};

const closeFullscreenEditor = () => {
  closeModal(editImgEl);
  pristine.reset();
  uploadImgFormEl.reset();
  resetScale();
  resetEffect();
  document.removeEventListener('keydown', onEscKeydown);
  closeEditImgButtonEl.removeEventListener('click', onCloseButtonClick);
  scaleSmallerButtonEl.removeEventListener('click', onScaleSmallerClick);
  scaleBiggerButtonEl.removeEventListener('click', onScaleBiggererClick);
  uploadImgFormEl.removeEventListener('change', onEffectChange);
};

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === hashtagsFieldEl || document.activeElement === descriptionFieldEl || errorPostEl.isConnected) {
      evt.stopPropagation();
    } else {
      closeFullscreenEditor();
    }
  }
}

function onCloseButtonClick() {
  closeFullscreenEditor();
}

function onUploudButtionClick(evt) {
  evt.preventDefault();
  addPreview();
  showModal(editImgEl);
  showFullscreenEditor();
}

uploadImgButtonEl.addEventListener('change', onUploudButtionClick);

export { closeFullscreenEditor };
