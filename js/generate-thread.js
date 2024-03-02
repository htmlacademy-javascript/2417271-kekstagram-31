import {getDataToGenerateThread} from './data.js';
import {getRandomLimitInteger,
  getRandomUniqueInteger,
  getRandomArrayElement} from './utils.js';

// основные функции
const { DESCRIPTIONS, COMMENT_MESSAGES, NAMES, SETTING_POSTS, SETTING_COMMENT } = getDataToGenerateThread();
const generateCommentId = getRandomUniqueInteger(0, 1000); //в задании не задан лимит значений
const generatePostId = getRandomUniqueInteger(SETTING_POSTS.idMinLimit, SETTING_POSTS.idMaxLimit);

const generateComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomLimitInteger(SETTING_COMMENT.avatarMinLimit, SETTING_COMMENT.avatarMaxLimit)}.svg`,
  message: getRandomArrayElement(COMMENT_MESSAGES),
  name: getRandomArrayElement(NAMES),
});


const generatePost = () => {
  const postId = generatePostId();
  return {
    id: postId,
    url: `photos/${postId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomLimitInteger(SETTING_POSTS.likesMinLimit, SETTING_POSTS.likesMaxLimit),
    comments: Array.from({ length: getRandomLimitInteger(SETTING_COMMENT.commentsMinLimit, SETTING_COMMENT.commentsMaxLimit) }, generateComment)
  };
};

const generateThread = () => {
  const thread = [];
  while (thread.length < SETTING_POSTS.amountPosts) {
    thread.push(generatePost());
  }
  return thread;
};

export {generateThread};
