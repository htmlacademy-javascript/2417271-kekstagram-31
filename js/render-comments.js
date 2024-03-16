import { createElement } from './utils.js';

const fullscreenPostEl = document.querySelector('.big-picture');
const commentsLouderEl = fullscreenPostEl.querySelector('.social__comments-loader');
const commentsContainerEl = fullscreenPostEl.querySelector('.social__comments');

const commentsFragment = document.createDocumentFragment();
const LOUD_STEP = 5;

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
  if (commentsArr.length <= LOUD_STEP) {
    commentsArr.forEach((comment) => renderComment(comment));
    commentsContainerEl.append(commentsFragment);
    commentsLouderEl.classList.add('hidden');
  } else {
    const lastComment = commentsContainerEl.children.length;
    if (commentsArr.length < lastComment + LOUD_STEP) {
      const renderPack = commentsArr.slice(lastComment);
      renderPack.forEach((comment) => renderComment(comment));
      commentsContainerEl.append(commentsFragment);
      commentsLouderEl.classList.add('hidden');
    } else {
      const renderPack = commentsArr.slice(lastComment, lastComment + LOUD_STEP);
      renderPack.forEach((comment) => renderComment(comment));
      commentsContainerEl.append(commentsFragment);
      commentsLouderEl.classList.remove('hidden');
    }
  }
};

const renderComments = (currentCommentsData) => {
  renderCommentsPack(currentCommentsData);
  commentsLouderEl.addEventListener('click', onCommentLoudButtonClick);
};

const clearComments = () => {
  commentsContainerEl.innerHTML = '';
  commentsLouderEl.removeEventListener('click', onCommentLoudButtonClick);
};


function onCommentLoudButtonClick (evt) {
  if (evt.target.matches('.social__comments-loader')) {
    // renderCommentsPack(????) не могу придумать, как привязать контекст текущего поста
  }
}

export { renderCommentsPack, renderComments, clearComments };
