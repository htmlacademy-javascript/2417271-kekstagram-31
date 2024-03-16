// 1. Атрибуты для <form> - см. тз
// 2. Загрузка изображения, форма редактирования (пока без подстановки выбранного изображения в форму) - см. тз
// 3. Закрытие формы - см. тз (ВАЖНО: сброс форм после загрузки)
// 4. Валидация формы добавления изображения: хэштэги, комментарий - см. тз
// 4.1. Валидация при отправке - обязательна, при заполнении - вариативно
import { isEscapeKey, showModal, closeModal } from './utils.js';

const uploadImgFormEl = document.querySelector('#upload-select-image');
const uploadImgButtonEl = uploadImgFormEl.querySelector('#upload-file');

const editImgEl = uploadImgFormEl.querySelector('.img-upload__overlay');
// const editorPreview = editImgEl.querySelector('.img-upload__preview').querySelector('img');
// const hashtagsFieldEl = editImgEl.querySelector('#hashtags');
// const describtionFieldEl = editImgEl.querySelector('#description');

// const editFormSubmitEl = editImgEl.querySelector('#upload-submit');
const closeEditImgButtonEl = editImgEl.querySelector('.img-upload__cancel');

// const pristine = new Pristine(uploadImgFormEl);

const showFullscreenEditor = () => {
  // console.log(uploadImgButtonEl.value); - как-то подставим это фото в editorPreview
  document.addEventListener('keydown', onEscKeydown);
  closeEditImgButtonEl.addEventListener('click', onCloseButtonClick);
};

const closeFullscreenEditor = () => {
  uploadImgFormEl.reset();
  closeModal(editImgEl);
  document.removeEventListener('keydown', onEscKeydown);
  closeEditImgButtonEl.removeEventListener('click', onCloseButtonClick);
};

function onEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFullscreenEditor();
  }
}

function onCloseButtonClick () {
  closeFullscreenEditor();
}

uploadImgButtonEl.addEventListener('change', (evt) => {
  evt.preventDefault();
  showModal(editImgEl);
  showFullscreenEditor();
});
