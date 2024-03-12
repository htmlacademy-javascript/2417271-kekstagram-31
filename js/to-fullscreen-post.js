// 2.3. Список комментариев:
// -список в блоке  .social__comments
// -разметка комментария:
// <li class="social__comment">
//   <img
//     class="social__picture"
//     src="{{аватар}}"
//     alt="{{имя комментатора}}"
//     width="35" height="35">
//   <p class="social__text">{{текст комментария}}</p>
// </li>

import {createElement, isEscapeKey} from './utils.js';
import {currentThread} from './generate-thread.js';

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
const commentEl = commentsContainerEl.querySelector('.social__comment:first-child');

const renderFullscreenComment = ({avatar, message, name}) => {
  const newComment = commentEl.cloneNode(true);
  commentsContainerEl.innerHTML = '';
  const newCommentAvatar = newComment.querySelector('social__picture');
  const newCommentMessage = newComment.querySelector('social__text');

  console.log(newComment);
  console.log(newCommentAvatar, newCommentMessage);
  // const newComment = createElement('li', 'social__comment');
  // const newCommentAvatar = createElement('img', 'social__picture');
  // newCommentAvatar.src = avatar;
  // newCommentAvatar.alt = name;
  // newCommentMessage.textContent = message;
  // const newCommentMessage = createElement('p', 'social__text', message);

  // newComment.append(newCommentAvatar, newCommentMessage);
  // commentsContainerEl.append(newComment);
};

const renderFullscreenPost = (dataArr, evt) => {
  const indexClickedEl = Array.from(thumbnails).indexOf(evt.target.parentNode);
  const {url, description, comments, likes} = dataArr[indexClickedEl - 2]; //-2 потому что перед элементами-миниатюрами в том же контейнере лежит заголовок секции и секция для загрузки новых фоток
  fullscreenImgEl.src = url;
  fullscreenLikesCountEl.textContent = likes;
  fullscreenCommentsShownCountEl.textContent = comments.length; //отделить количество показываемых комментариев
  fullscreenCommentsTotalCountEl.textContent = comments.length;
  fullscreenDescriptionEl.textContent = description;
  comments.forEach((comment) => renderFullscreenComment(comment));
};

const showFullscreenPost = () => {
  fullscreenPostEl.classList.remove('hidden');
  fullscreenCommentsCountEl.classList.add('hidden');
  fullscreenCommentsLouderEl.classList.add('hidden');
  document.addEventListener('keydown', onEscKeydown);
};

const closeFullscreenPost = () => {
  fullscreenPostEl.classList.add('hidden');
  document.removeEventListener('keydown', onEscKeydown);
};

const onEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullscreenPost();
  }
};

const onThumbnailClick = (evt) => {
  if (evt.target.closest('.picture')) {
    evt.preventDefault();
    renderFullscreenPost(currentThread, evt);
    showFullscreenPost();
  }
};

thumbnailsContainerEl.addEventListener('click', onThumbnailClick);
closeFullscreenButtonEl.addEventListener('click', closeFullscreenPost);
