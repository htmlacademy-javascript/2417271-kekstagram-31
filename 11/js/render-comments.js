import { createElement } from './utils.js';

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
  return newComment;
};

let lastComment = 0;

const renderComments = (currentCommentsArr) => {
  currentCommentsArr.forEach((comment, index) => {
    const newComment = renderComment(comment);
    if (index >= LOAD_STEP) {
      newComment.classList.add('hidden');
    }
    commentsFragment.append(newComment);
  });

  commentsContainerEl.append(commentsFragment);

  if (currentCommentsArr.length <= LOAD_STEP) {
    commentsLoaderEl.classList.add('hidden');
    fullscreenCommentsShownCountEl.textContent = currentCommentsArr.length;
  } else {
    commentsLoaderEl.classList.remove('hidden');
    fullscreenCommentsShownCountEl.textContent = LOAD_STEP;
    lastComment = LOAD_STEP;
  }
  fullscreenCommentsTotalCountEl.textContent = currentCommentsArr.length;
};

function onCommentLoudButtonClick() {
  const Comments = commentsContainerEl.querySelectorAll('.social__comment');
  if (Comments.length <= lastComment + LOAD_STEP) {
    Comments.forEach((comment) => comment.classList.remove('hidden'));
    commentsLoaderEl.classList.add('hidden');
    fullscreenCommentsShownCountEl.textContent = Comments.length;
  } else {
    for (let i = lastComment; i < lastComment + LOAD_STEP; i++) {
      Comments[i].classList.remove('hidden');
    }
    lastComment += LOAD_STEP;
    fullscreenCommentsShownCountEl.textContent = lastComment;
  }
}

const clearComments = () => {
  lastComment = 0;
  commentsContainerEl.innerHTML = '';
};

export { renderComments, clearComments, onCommentLoudButtonClick };
