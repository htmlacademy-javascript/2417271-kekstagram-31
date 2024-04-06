import { onThumbnailClick, setThumbnails } from './fullscreen-post-open-close.js';

const thumbnailsContainerEl = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const thumbnailsFragment = document.createDocumentFragment();

const createThumbnail = ({ id, url, description, comments, likes }) => {
  const newThumbnail = thumbnailTemplate.cloneNode(true);
  const thumbnailImg = newThumbnail.querySelector('.picture__img');
  const thumbnailComments = newThumbnail.querySelector('.picture__comments');
  const thumbnailLikes = newThumbnail.querySelector('.picture__likes');

  newThumbnail.dataset.photoId = id;
  thumbnailImg.src = url;
  thumbnailImg.alt = description;
  thumbnailComments.textContent = comments.length;
  thumbnailLikes.textContent = likes;

  thumbnailsFragment.append(newThumbnail);
};

const removeThumbnails = () => {
  const thumbnails = Array.from(thumbnailsContainerEl.querySelectorAll('.picture'));
  thumbnails.forEach((thumbnail) => thumbnail.remove());
  thumbnailsContainerEl.removeEventListener('click', onThumbnailClick);
};

const addThumbnails = (thumbnailsData) => {
  removeThumbnails();
  thumbnailsData.forEach((thumbnailObj) => createThumbnail(thumbnailObj));
  thumbnailsContainerEl.append(thumbnailsFragment);
  setThumbnails(thumbnailsData);
  thumbnailsContainerEl.addEventListener('click', onThumbnailClick);
};

export { thumbnailsContainerEl, addThumbnails };
