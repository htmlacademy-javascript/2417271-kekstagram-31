import {generateThread} from './generate-thread.js';

const thumbnailsContainer = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsData = generateThread();

const thumbnailsFragment = document.createDocumentFragment();

const createThumbnail = (post) => {
  const newThumbnail = thumbnailTemplate.cloneNode(true);
  const thumbnailImg = newThumbnail.querySelector('.picture__img');
  const thumbnailComments = newThumbnail.querySelector('.picture__comments');
  const thumbnailLikes = newThumbnail.querySelector('.picture__likes');

  thumbnailImg.src = post.url;
  thumbnailImg.alt = post.description;
  thumbnailComments.textContent = post.comments.length;
  thumbnailLikes.textContent = post.likes;

  thumbnailsFragment.append(newThumbnail);
};

thumbnailsData.forEach((thumbnailObj) => createThumbnail(thumbnailObj));
thumbnailsContainer.append(thumbnailsFragment);

