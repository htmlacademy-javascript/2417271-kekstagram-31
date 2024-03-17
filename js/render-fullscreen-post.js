import {renderComments} from './render-comments.js';

const fullscreenPostEl = document.querySelector('.big-picture');
const fullscreenImgEl = fullscreenPostEl.querySelector('.big-picture__img').querySelector('img');
const fullscreenDescriptionEl = fullscreenPostEl.querySelector('.social__caption');
const fullscreenLikesCountEl = fullscreenPostEl.querySelector('.likes-count');
const fullscreenCommentsShownCountEl = fullscreenPostEl.querySelector('.social__comment-shown-count');
const fullscreenCommentsTotalCountEl = fullscreenPostEl.querySelector('.social__comment-total-count');
const commentsContainerEl = fullscreenPostEl.querySelector('.social__comments');

const renderFullscreenPost = ({ url, description, comments, likes }) => {
  fullscreenImgEl.src = url;
  fullscreenLikesCountEl.textContent = likes;
  fullscreenDescriptionEl.textContent = description;
  commentsContainerEl.innerHTML = '';
  renderComments(comments);
  fullscreenCommentsShownCountEl.textContent = commentsContainerEl.children.length;
  fullscreenCommentsTotalCountEl.textContent = comments.length;
};


export {renderFullscreenPost};
