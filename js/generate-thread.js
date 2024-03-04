import {getDataToGenerateThread} from './data.js';
import {getRandomLimitInteger,
  createUniqueIdGenerator,
  getRandomArrayElement} from './utils.js';

// основные функции
const { DESCRIPTIONS, COMMENT_MESSAGES, NAMES, SETTING_POSTS, SETTING_COMMENT } = getDataToGenerateThread();
const generateCommentId = createUniqueIdGenerator();

const generateComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomLimitInteger(SETTING_COMMENT.avatarMinLimit, SETTING_COMMENT.avatarMaxLimit)}.svg`,
  message: getRandomArrayElement(COMMENT_MESSAGES),
  name: getRandomArrayElement(NAMES),
});


const generatePost = (_, index) => ({
  id: index + 1,
  url: `photos/${index + 1}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomLimitInteger(SETTING_POSTS.likesMinLimit, SETTING_POSTS.likesMaxLimit),
  comments: Array.from({ length: getRandomLimitInteger(SETTING_COMMENT.commentsMinLimit, SETTING_COMMENT.commentsMaxLimit) }, generateComment)
});

const generateThread = () => Array.from({ length: SETTING_POSTS.amountPosts }, generatePost);

generateThread();

export {generateThread};
