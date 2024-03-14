const thumbnailsContainerEl = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const thumbnailsFragment = document.createDocumentFragment();

const createThumbnail = ({url, description, comments, likes}) => {
  const newThumbnail = thumbnailTemplate.cloneNode(true);
  const thumbnailImg = newThumbnail.querySelector('.picture__img');
  const thumbnailComments = newThumbnail.querySelector('.picture__comments');
  const thumbnailLikes = newThumbnail.querySelector('.picture__likes');

  thumbnailImg.src = url;
  thumbnailImg.alt = description;
  thumbnailComments.textContent = comments.length;
  thumbnailLikes.textContent = likes;

  thumbnailsFragment.append(newThumbnail);
};

const addThumbnails = (thumbnailsData) => {
  thumbnailsData.forEach((thumbnailObj) => createThumbnail(thumbnailObj));
  thumbnailsContainerEl.append(thumbnailsFragment);
};

const currentThread = addThumbnails();

export {currentThread};
