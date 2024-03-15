import { isEscapeKey, showModal, closeModal } from './utils.js';
import {renderFullscreenPost} from './render-fullscreen-post.js';
import {clearComments} from './render-comments.js';

const thumbnailsContainerEl = document.querySelector('.pictures');
const fullscreenPostEl = document.querySelector('.big-picture');
const closeFullscreenButtonEl = document.querySelector('.big-picture__cancel');

const showFullscreenPost = (currentPostData) => {
  showModal(fullscreenPostEl);
  renderFullscreenPost(currentPostData);
  document.addEventListener('keydown', onEscKeydown);
  closeFullscreenButtonEl.addEventListener('click', onCloseButtonClick);
  fullscreenPostEl.addEventListener('click', onBackdropClick);
};

const closeFullscreenPost = () => {
  closeModal(fullscreenPostEl);
  clearComments();
  document.removeEventListener('keydown', onEscKeydown);
  closeFullscreenButtonEl.removeEventListener('click', onCloseButtonClick);
  fullscreenPostEl.removeEventListener('click', onBackdropClick);
};

function onCloseButtonClick() {
  closeFullscreenPost();
}

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullscreenPost();
  }
}

function onBackdropClick(evt) {
  if (evt.target.matches('.big-picture')) {
    closeFullscreenPost();
  }
}

const onThumbnailClick = (dataArr, evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    const clickedEl = dataArr.find((element) => element.id === Number(evt.target.parentNode.dataset.photoId));
    showFullscreenPost(clickedEl);
  }
};

export {thumbnailsContainerEl, onThumbnailClick};
