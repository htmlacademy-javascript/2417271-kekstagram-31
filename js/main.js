// данные для генерации
const DESCRIPTIONS = [
  'Долгожданный отпуск!',
  'Если отдых, то только такой',
  'Креативно :)',
  'Утро начинается не с кофе',
  'Оставлю здесь на память',
  'Shut up and take my money',
  'Хвастаться нехорошо, но'
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Сэм',
  'Милли',
  'Лилит',
  'Коул',
  'Бьянка',
  'Найра',
  'Стивен',
  'Эбби',
  'Дерек',
  'Иеремия'
];

const SETTING_POSTS = {
  amountPosts: 25,
  idMinLimit: 1,
  idMaxLimit: 25,
  likesMinLimit: 15,
  likesMaxLimit: 200,
};

const SETTING_COMMENT = {
  commentsMinLimit: 0,
  commentsMaxLimit: 30,
  avatarMinLimit: 1,
  avatarMaxLimit: 6
};

// вспомогательные функции
const getRandomLimitInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// В течение раздела нас заметно направляли в сторону написания такой функции, так что пока оставляю на случай, если понадобится где-то позже
// const getRandomUniqueInteger = (min, max) => {
//   const valuesCollection = [];
//   return function () {
//     if (valuesCollection.length >= (max - min + 1)) {
//       return null;
//     }
//     let currentValue = getRandomLimitInteger(min, max);
//     while (valuesCollection.includes(currentValue)) {
//       currentValue = getRandomLimitInteger(min, max);
//     }
//     valuesCollection.push(currentValue);
//     return currentValue;
//   };
// };

const createUniqueIdGenerator = () => {
  let id = 1;
  return () => {
    const currentId = id;
    id++;
    return currentId;
  };
};

const getRandomArrayElement = (array) => array[getRandomLimitInteger(0, array.length - 1)];

// основные функции
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
