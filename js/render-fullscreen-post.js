
import { renderComments } from './render-comments.js';

const fullscreenPostEl = document.querySelector('.big-picture');
const fullscreenImgEl = fullscreenPostEl.querySelector('.big-picture__img').querySelector('img');
const fullscreenDescriptionEl = fullscreenPostEl.querySelector('.social__caption');
const fullscreenLikesCountEl = fullscreenPostEl.querySelector('.likes-count');

const commentsContainerEl = fullscreenPostEl.querySelector('.social__comments');

const renderFullscreenPost = ({ url, description, comments, likes }) => {
  fullscreenImgEl.src = url;
  fullscreenLikesCountEl.textContent = likes;
  fullscreenDescriptionEl.textContent = description;
  commentsContainerEl.innerHTML = '';
  renderComments(comments);
};

export { renderFullscreenPost };
