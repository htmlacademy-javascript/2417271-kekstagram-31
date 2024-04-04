import { isEscapeKey, showModal, closeModal } from './utils.js';
import { renderFullscreenPost } from './render-fullscreen-post.js';
import { clearComments, onCommentLoudButtonClick } from './render-comments.js';

const fullscreenPostEl = document.querySelector('.big-picture');
const closeFullscreenButtonEl = document.querySelector('.big-picture__cancel');
const commentsLoaderEl = fullscreenPostEl.querySelector('.social__comments-loader');

const showFullscreenPost = () => {
  showModal(fullscreenPostEl);
  document.addEventListener('keydown', onEscKeydown);
  closeFullscreenButtonEl.addEventListener('click', onCloseButtonClick);
  commentsLoaderEl.addEventListener('click', onCommentLoudButtonClick);
};

const closeFullscreenPost = () => {
  closeModal(fullscreenPostEl);
  clearComments();
  document.removeEventListener('keydown', onEscKeydown);
  closeFullscreenButtonEl.removeEventListener('click', onCloseButtonClick);
  commentsLoaderEl.addEventListener('click', onCommentLoudButtonClick);
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

const onThumbnailClick = (dataArr, evt) => {
  const clickedEl = evt.target.closest('.picture');
  if (clickedEl) {
    evt.preventDefault();
    const clickedElData = dataArr.find((element) => element.id === Number(clickedEl.dataset.photoId));
    renderFullscreenPost(clickedElData);
    showFullscreenPost();
  }
};

export { onThumbnailClick };
