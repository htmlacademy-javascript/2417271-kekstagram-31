
import { renderComments } from './render-comments.js';

const fullscreenPostEl = document.querySelector('.big-picture');
const fullscreenImgEl = fullscreenPostEl.querySelector('.big-picture__img').querySelector('img');
const fullscreenDescriptionEl = fullscreenPostEl.querySelector('.social__caption');
const fullscreenLikesCountEl = fullscreenPostEl.querySelector('.likes-count');

const commentsContainerEl = fullscreenPostEl.querySelector('.social__comments');
// const commentsLoaderEl = fullscreenPostEl.querySelector('.social__comments-loader'); // закомментировать для варианта предварительной генерации всех комментариев

// const renderFullscreenPost = ({ id, url, description, comments, likes }) => { // закомментировать для варианта предварительной генерации всех комментариев
const renderFullscreenPost = ({ url, description, comments, likes }) => { // для варианта предварительной генерации всех комментариев

  fullscreenImgEl.src = url;
  fullscreenLikesCountEl.textContent = likes;
  fullscreenDescriptionEl.textContent = description;
  commentsContainerEl.innerHTML = '';
  renderComments(comments);
  // commentsLoaderEl.dataset.postId = id; // закомментировать для варианта предварительной генерации всех комментариев
};


export { renderFullscreenPost };
