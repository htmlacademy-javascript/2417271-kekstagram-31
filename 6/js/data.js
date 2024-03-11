// данные для генерации
const getDataToGenerateThread = () => {
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

  return { DESCRIPTIONS, COMMENT_MESSAGES, NAMES, SETTING_POSTS, SETTING_COMMENT };
};

export {getDataToGenerateThread};
