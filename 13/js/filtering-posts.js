import { thumbnailsContainerEl, addThumbnails } from './add-thumbnails.js';
import { generateUniqueArray, debounce } from './utils.js';

const AMOUNT_RANDOM_POSTS = 10;
const DEBOUNSE_DELAY = 500;

const filteringEl = document.querySelector('.img-filters');
const filteringForm = filteringEl.querySelector('.img-filters__form');
const filtersList = filteringForm.querySelectorAll('.img-filters__button');

const comparePosts = (firstPost, secondPost) => {
  const firstItemComments = firstPost.comments.length;
  const secondItemComments = secondPost.comments.length;
  return secondItemComments - firstItemComments;
};

const filteredDefault = (dataArr) => addThumbnails(dataArr);

const filteredRandom = (dataArr) => {
  const newArr = generateUniqueArray(AMOUNT_RANDOM_POSTS, dataArr);
  addThumbnails(newArr);
};

const filteredDiscussed = (dataArr) => addThumbnails(dataArr.slice().sort(comparePosts));

const chooseFilter = (dataArr, evt) => {
  const currentFilter = evt.target;
  if (currentFilter.matches('.img-filters__button')) {
    const lastFilter = Array.from(filtersList).find((filter) => filter.classList.contains('img-filters__button--active'));
    if (currentFilter !== lastFilter) {
      lastFilter.classList.remove('img-filters__button--active');
      currentFilter.classList.add('img-filters__button--active');
      const thumbnails = Array.from(thumbnailsContainerEl.querySelectorAll('.picture'));
      thumbnails.forEach((thumbnail) => thumbnail.remove());
      switch (currentFilter.id) {
        case ('filter-default'):
          debounce(filteredDefault(dataArr), DEBOUNSE_DELAY);
          break;
        case ('filter-random'):
          debounce(filteredRandom(dataArr), DEBOUNSE_DELAY);
          break;
        case ('filter-discussed'):
          debounce(filteredDiscussed(dataArr), DEBOUNSE_DELAY);
          break;
      }
    }
  }
};

const showFilters = (dataArr) => {
  filteringEl.classList.remove('img-filters--inactive');
  filteringForm.addEventListener('click', chooseFilter.bind(null, dataArr));
};

export { showFilters };
