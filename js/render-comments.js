import { createElement } from './utils.js';
import { currentThread } from './generate-thread.js';

const LOAD_STEP = 5;

const fullscreenPostEl = document.querySelector('.big-picture');
const commentsLoaderEl = fullscreenPostEl.querySelector('.social__comments-loader');
const commentsContainerEl = fullscreenPostEl.querySelector('.social__comments');
const fullscreenCommentsShownCountEl = fullscreenPostEl.querySelector('.social__comment-shown-count');
const fullscreenCommentsTotalCountEl = fullscreenPostEl.querySelector('.social__comment-total-count');


const commentsFragment = document.createDocumentFragment();

const renderComment = ({ avatar, message, name }) => {
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

const renderCommentsPack = (commentsArr) => {
  if (commentsArr.length <= LOAD_STEP) {
    commentsArr.forEach((comment) => renderComment(comment));
    commentsLoaderEl.classList.add('hidden');
    fullscreenCommentsShownCountEl.textContent = commentsArr.length;
  } else {
    const lastComment = commentsContainerEl.querySelectorAll('.social__comment').length;
    let renderPack;
    if (commentsArr.length <= lastComment + LOAD_STEP) {
      renderPack = commentsArr.slice(lastComment);
      commentsLoaderEl.classList.add('hidden');
    } else {
      renderPack = commentsArr.slice(lastComment, lastComment + LOAD_STEP);
      commentsLoaderEl.classList.remove('hidden');
    }
    renderPack.forEach((comment) => renderComment(comment));
    fullscreenCommentsShownCountEl.textContent = lastComment + renderPack.length;
  }
  commentsContainerEl.append(commentsFragment);
  fullscreenCommentsTotalCountEl.textContent = commentsArr.length;
};

const renderComments = (currentCommentsData) => {
  renderCommentsPack(currentCommentsData);
  commentsLoaderEl.addEventListener('click', onCommentLoudButtonClick);
};

const clearComments = () => {
  commentsContainerEl.innerHTML = '';
  commentsLoaderEl.removeEventListener('click', onCommentLoudButtonClick);
};


function onCommentLoudButtonClick(evt) {
  const currentCommentsLoader = evt.target;
  const currentPostData = currentThread.find((element) => element.id === Number(currentCommentsLoader.dataset.postId));
  renderCommentsPack(currentPostData.comments);
}

export { renderCommentsPack, renderComments, clearComments };
