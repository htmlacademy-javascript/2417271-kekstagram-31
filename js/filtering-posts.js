import { addThumbnails } from './add-thumbnails.js';
import { generateUniqueArray, debounce } from './utils.js';

const AMOUNT_RANDOM_POSTS = 10;
const DEBOUNCE_DELAY = 500;
const ACTIVE_FILTER = 'img-filters__button--active';

const Filters = {
  DEFAULT: {
    name: 'filter-default',
    getFilter(postsData) {
      return postsData;
    }
  },
  RANDOM: {
    name: 'filter-random',
    getFilter(postsData) {
      const newArr = generateUniqueArray(AMOUNT_RANDOM_POSTS, postsData);
      return newArr;
    }
  },
  DISCUSSED: {
    name: 'filter-discussed',
    comparePosts(firstPost, secondPost) {
      const firstItemComments = firstPost.comments.length;
      const secondItemComments = secondPost.comments.length;
      return secondItemComments - firstItemComments;
    },
    getFilter(postsData) {
      const newArr = postsData.slice().sort(this.comparePosts);
      return newArr;
    }
  }
};

const filteringEl = document.querySelector('.img-filters');
const filteringForm = filteringEl.querySelector('.img-filters__form');
const filtersList = filteringForm.querySelectorAll('.img-filters__button');

const debounceRender = debounce(addThumbnails, DEBOUNCE_DELAY);
let defaultPostsData = [];

const onFilterClick = (evt) => {
  const currentFilter = evt.target;
  if (currentFilter.matches('.img-filters__button')) {
    const lastFilter = Array.from(filtersList).find((filter) => filter.classList.contains(ACTIVE_FILTER));
    if (currentFilter !== lastFilter) {
      lastFilter.classList.remove(ACTIVE_FILTER);
      currentFilter.classList.add(ACTIVE_FILTER);
      const { DEFAULT, RANDOM, DISCUSSED } = Filters;
      let currentPostsData = [];
      switch (currentFilter.id) {
        case (DEFAULT.name):
          currentPostsData = DEFAULT.getFilter(defaultPostsData);
          break;
        case (RANDOM.name):
          currentPostsData = RANDOM.getFilter(defaultPostsData);
          break;
        case (DISCUSSED.name):
          currentPostsData = DISCUSSED.getFilter(defaultPostsData);
          break;
      }
      debounceRender(currentPostsData);
    }
  }
};

const setFilter = (dataArr) => {
  defaultPostsData = dataArr;
  filteringEl.classList.remove('img-filters--inactive');
  filteringForm.addEventListener('click', onFilterClick);
};

export { setFilter };
