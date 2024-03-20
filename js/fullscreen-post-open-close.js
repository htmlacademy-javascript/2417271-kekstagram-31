import { isEscapeKey, showModal, closeModal } from './utils.js';
import { currentThread } from './generate-thread.js';
import { renderFullscreenPost } from './render-fullscreen-post.js';
// import { clearComments } from './render-comments.js'; // закомментировать для варианта предварительной генерации всех комментариев
import { clearComments, onCommentLoudButtonClick } from './render-comments.js'; //для варианта предварительной генерации всех комментариев

const thumbnailsContainerEl = document.querySelector('.pictures');
const fullscreenPostEl = document.querySelector('.big-picture');
const closeFullscreenButtonEl = document.querySelector('.big-picture__cancel');
const commentsLoaderEl = fullscreenPostEl.querySelector('.social__comments-loader'); //для варианта предварительной генерации всех комментариев

const showFullscreenPost = () => {
  showModal(fullscreenPostEl);
  document.addEventListener('keydown', onEscKeydown);
  closeFullscreenButtonEl.addEventListener('click', onCloseButtonClick);
  fullscreenPostEl.addEventListener('click', onBackdropClick);
  commentsLoaderEl.addEventListener('click', onCommentLoudButtonClick); //для варианта предварительной генерации всех комментариев
};

const closeFullscreenPost = () => {
  closeModal(fullscreenPostEl);
  clearComments();
  document.removeEventListener('keydown', onEscKeydown);
  closeFullscreenButtonEl.removeEventListener('click', onCloseButtonClick);
  fullscreenPostEl.removeEventListener('click', onBackdropClick);
  commentsLoaderEl.addEventListener('click', onCommentLoudButtonClick); //для варианта предварительной генерации всех комментариев
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