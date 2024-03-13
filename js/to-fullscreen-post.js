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

// const uploudeComments = (comments, evt) => {
// const shownComments = commentsContainerEl.children.length;
// for (let i = shownComments; i <= shownComments + 5; i++) {
//   renderFullscreenComment(comments[i]);
// }

// const toLoudeButtonClick = (commentsArr) => {
//   if (commentsLouderEl.matches(!'.hidden')) {
//     commentsLouderEl.addEventListener('click', uploudeComments(commentsArr));
//   } else {
//     commentsLouderEl.removeEventListener('click', uploudeComments(commentsArr));
//   }
// };

const renderFullscreenPost = (dataArr, evt) => {
  const indexClickedEl = Array.from(thumbnails).indexOf(evt.target.parentNode);
  const { url, description, comments, likes } = dataArr[indexClickedEl - 2]; //-2 потому что перед элементами-миниатюрами в контейнере 2 элемента: заголовок секции и секция для загрузки новых фоток
  fullscreenImgEl.src = url;
  fullscreenLikesCountEl.textContent = likes;
  fullscreenDescriptionEl.textContent = description;
  commentsContainerEl.innerHTML = '';

  // тз: при открытии поста показаны 5 комментариев. В тз не указанно, первых/последних/т.п., поэтому первых
  if (comments.length <= 5) {
    comments.forEach((comment) => renderFullscreenComment(comment));
    commentsLouderEl.classList.add('hidden');
  } else {
    for (let i = 0; i < 5; i++) {
      renderFullscreenComment(comments[i]);
      commentsLouderEl.classList.remove('hidden');
    }
  }

  fullscreenCommentsShownCountEl.textContent = commentsContainerEl.children.length;
  fullscreenCommentsTotalCountEl.textContent = comments.length;
};

const clearFullscreen = () => {
  commentsContainerEl.innerHTML = '';
};

const showFullscreenPost = () => {
  fullscreenPostEl.classList.remove('hidden');
  document.addEventListener('keydown', onEscKeydown);
  fullscreenPostEl.addEventListener('click', onBackdropClick);
};

const closeFullscreenPost = () => {
  fullscreenPostEl.classList.add('hidden');
  clearFullscreen();
  document.removeEventListener('keydown', onEscKeydown);
  fullscreenPostEl.removeEventListener('click', onBackdropClick);
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

