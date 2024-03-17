import { isEscapeKey, showModal, closeModal } from './utils.js';
import { currentThread } from './generate-thread.js';
import { renderFullscreenPost } from './render-fullscreen-post.js';
import { clearComments } from './render-comments.js';

const thumbnailsContainerEl = document.querySelector('.pictures');
const fullscreenPostEl = document.querySelector('.big-picture');
const closeFullscreenButtonEl = document.querySelector('.big-picture__cancel');

const showFullscreenPost = () => {
  showModal(fullscreenPostEl);
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

const onThumbnailClick = (evt) => {
  const clickedEl = evt.target.closest('.picture');
  if (clickedEl) {
    evt.preventDefault();
    const clickedElData = currentThread.find((element) => element.id === Number(clickedEl.dataset.photoId));
    renderFullscreenPost(clickedElData);
    showFullscreenPost();
  }
};

thumbnailsContainerEl.addEventListener('click', onThumbnailClick);
