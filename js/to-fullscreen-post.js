import { createElement, isEscapeKey } from './utils.js';
import { currentThread } from './generate-thread.js'; // я не придумала, как реализовать сопоставление миниатюр-полноразмерок без импорта сюда данных

const thumbnailsContainerEl = document.querySelector('.pictures');
const thumbnails = thumbnailsContainerEl.children;
const fullscreenPostEl = document.querySelector('.big-picture');
const closeFullscreenButtonEl = document.querySelector('.big-picture__cancel');
const fullscreenImgEl = fullscreenPostEl.querySelector('.big-picture__img').querySelector('img');
const fullscreenDescriptionEl = fullscreenPostEl.querySelector('.social__caption');
const fullscreenLikesCountEl = fullscreenPostEl.querySelector('.likes-count');
const fullscreenCommentsShownCountEl = fullscreenPostEl.querySelector('.social__comment-shown-count');
const fullscreenCommentsTotalCountEl = fullscreenPostEl.querySelector('.social__comment-total-count');
const fullscreenCommentsCountEl = fullscreenPostEl.querySelector('.social__comment-count');
const fullscreenCommentsLouderEl = fullscreenPostEl.querySelector('.comments-loader');
const commentsContainerEl = fullscreenPostEl.querySelector('.social__comments');

const renderFullscreenComment = ({ avatar, message, name }) => {
  const newComment = createElement('li', 'social__comment');
  const newCommentAvatar = createElement('img', 'social__picture');
  newCommentAvatar.src = avatar;
  newCommentAvatar.alt = name;
  newCommentAvatar.width = 35;
  newCommentAvatar.height = 35;
  const newCommentMessage = createElement('p', 'social__text', message);
  newComment.append(newCommentAvatar, newCommentMessage);
  commentsContainerEl.append(newComment);
};

const renderFullscreenPost = (dataArr, evt) => {
  const indexClickedEl = Array.from(thumbnails).indexOf(evt.target.parentNode);
  const { url, description, comments, likes } = dataArr[indexClickedEl - 2]; //-2 потому что перед элементами-миниатюрами в контейнере 2 элемента: заголовок секции и секция для загрузки новых фоток
  fullscreenImgEl.src = url;
  fullscreenLikesCountEl.textContent = likes;
  fullscreenCommentsShownCountEl.textContent = comments.length; //to-do: отделить количество показываемых комментариев
  fullscreenCommentsTotalCountEl.textContent = comments.length;
  fullscreenDescriptionEl.textContent = description;
  commentsContainerEl.innerHTML = '';
  comments.forEach((comment) => renderFullscreenComment(comment));
};

const clearFullscreen = () => {
  commentsContainerEl.innerHTML = '';
};

const showFullscreenPost = () => {
  fullscreenPostEl.classList.remove('hidden');
  fullscreenCommentsCountEl.classList.add('hidden');
  fullscreenCommentsLouderEl.classList.add('hidden');
  document.addEventListener('keydown', onEscKeydown);
  document.addEventListener('click', onBackdropClick);
};

const closeFullscreenPost = () => {
  fullscreenPostEl.classList.add('hidden');
  clearFullscreen();
  document.removeEventListener('keydown', onEscKeydown);
  document.removeEventListener('click', onBackdropClick);
};

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
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    renderFullscreenPost(currentThread, evt);
    showFullscreenPost();
  }
};

thumbnailsContainerEl.addEventListener('click', onThumbnailClick);
closeFullscreenButtonEl.addEventListener('click', closeFullscreenPost);
