import { createElement, isEscapeKey } from './utils.js';
import { currentThread } from './generate-thread.js'; // я не придумала, как реализовать сопоставление миниатюр/полноразмерок без импорта сюда данных

const thumbnailsContainerEl = document.querySelector('.pictures');
const thumbnails = thumbnailsContainerEl.children;
const fullscreenPostEl = document.querySelector('.big-picture');
const closeFullscreenButtonEl = document.querySelector('.big-picture__cancel');
const fullscreenImgEl = fullscreenPostEl.querySelector('.big-picture__img').querySelector('img');
const fullscreenDescriptionEl = fullscreenPostEl.querySelector('.social__caption');
const fullscreenLikesCountEl = fullscreenPostEl.querySelector('.likes-count');
const fullscreenCommentsShownCountEl = fullscreenPostEl.querySelector('.social__comment-shown-count');
const fullscreenCommentsTotalCountEl = fullscreenPostEl.querySelector('.social__comment-total-count');
const commentsLouderEl = fullscreenPostEl.querySelector('.social__comments-loader');
const commentsContainerEl = fullscreenPostEl.querySelector('.social__comments');

const commentsFragment = document.createDocumentFragment();

const renderFullscreenComment = ({ avatar, message, name }) => {
  const newComment = createElement('li', 'social__comment');
  const newCommentAvatar = createElement('img', 'social__picture');
  newCommentAvatar.src = avatar;
  newCommentAvatar.alt = name;
  newCommentAvatar.width = 35;
  newCommentAvatar.height = 35;
  const newCommentMessage = createElement('p', 'social__text', message);
  newComment.append(newCommentAvatar, newCommentMessage);
  commentsFragment.append(newComment);
};

const renderFullscreenPost = (dataArr, evt) => {
  const indexClickedEl = Array.from(thumbnails).indexOf(evt.target.parentNode);
  const { url, description, comments, likes } = dataArr[indexClickedEl - 2]; //-2 т.к. перед элементами-миниатюрами в контейнере 2 элемента: заголовок секции и секция для загрузки новых фоток
  fullscreenImgEl.src = url;
  fullscreenLikesCountEl.textContent = likes;
  fullscreenDescriptionEl.textContent = description;
  commentsContainerEl.innerHTML = '';
  comments.forEach((comment) => renderFullscreenComment(comment));

  // тз: при открытии поста показаны 5 комментариев. Не указанно, первых/последних/т.п., поэтому первых
  if (comments.length <= 5) {
    commentsContainerEl.append(commentsFragment);
    commentsLouderEl.classList.add('hidden');
  } else {
    for (let i = 0; i < 5; i++) {
      commentsContainerEl.append(commentsFragment.children[0]);
    }
    commentsLouderEl.classList.remove('hidden');
  }

  fullscreenCommentsShownCountEl.textContent = commentsContainerEl.children.length;
  fullscreenCommentsTotalCountEl.textContent = comments.length;
};

const clearFullscreen = () => {
  commentsContainerEl.append(commentsFragment); //я не придумала, как иначе очистить document fragment:(
  commentsContainerEl.innerHTML = '';
};

const showFullscreenPost = () => {
  fullscreenPostEl.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeydown);
  fullscreenPostEl.addEventListener('click', onBackdropClick);
  commentsLouderEl.addEventListener('click', onCommentLoudButtonClick);
};

const closeFullscreenPost = () => {
  fullscreenPostEl.classList.add('hidden');
  clearFullscreen();
  document.removeEventListener('keydown', onEscKeydown);
  fullscreenPostEl.removeEventListener('click', onBackdropClick);
  commentsLouderEl.removeEventListener('click', onCommentLoudButtonClick);
};

function onCommentLoudButtonClick (evt) {
  if (evt.target.matches('.social__comments-loader')) {
    if (commentsFragment.children.length >= 5) {
      for (let i = 0; i < 5; i++) {
        commentsContainerEl.append(commentsFragment.children[0]);
      }
    } else {
      commentsContainerEl.append(commentsFragment);
    }
    fullscreenCommentsShownCountEl.textContent = commentsContainerEl.children.length;
  }
  if (commentsFragment.children.length === 0) {
    commentsLouderEl.classList.add('hidden');
  }
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
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    renderFullscreenPost(currentThread, evt);
    showFullscreenPost();
  }
};

thumbnailsContainerEl.addEventListener('click', onThumbnailClick);
closeFullscreenButtonEl.addEventListener('click', closeFullscreenPost);

