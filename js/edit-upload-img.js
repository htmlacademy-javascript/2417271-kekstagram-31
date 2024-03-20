import { uploadImgFormEl } from './validate-form.js';

const SCALE_STEP = 25;
const SCALE_MIN_LIMIT = 25;
const SCALE_MAX_LIMIT = 100;
const SCALE_DEFAULT = 100;

const editImgEl = uploadImgFormEl.querySelector('.img-upload__overlay');
const editorPreview = editImgEl.querySelector('.img-upload__preview').querySelector('img');
const scaleInpEl = editImgEl.querySelector('.scale__control--value');
const effectInpEl = editImgEl.querySelector('#effect-level');
const effectSlider = editImgEl.querySelector('.img-upload__effect-level');

// редактор масштаба изображения
let currentScaleValue = parseInt(scaleInpEl.value, 10);

const editScale = () => {
  scaleInpEl.value = `${currentScaleValue}%`;
  editorPreview.style.transform = `scale(${currentScaleValue / 100})`;
};

const resetScale = () => {
  editorPreview.style.removeProperty('transform');
  currentScaleValue = SCALE_DEFAULT;
  scaleInpEl.value = `${currentScaleValue}%`;
};

const onScaleSmallerClick = () => {
  switch (currentScaleValue) {
    case SCALE_MIN_LIMIT:
      currentScaleValue = SCALE_MIN_LIMIT;
      break;
    default:
      currentScaleValue -= SCALE_STEP;
  }
  editScale();
};

const onScaleBiggererClick = () => {
  switch (currentScaleValue) {
    case SCALE_MAX_LIMIT:
      currentScaleValue = SCALE_MAX_LIMIT;
      break;
    default:
      currentScaleValue += SCALE_STEP;
  }
  editScale();
};

// редактор эффектов
const resetEffect = () => {};

const changeEffect = () => {};

const onEffectChange = (evt) => {
  const checkedEl = evt.target.closest('.effects__lable');
  if (checkedEl) {
    console.log(checkedEl);
  }
};

// const onThumbnailClick = (evt) => {
//   const clickedEl = evt.target.closest('.picture');
//   if (clickedEl) {
//     evt.preventDefault();
//     const clickedElData = currentThread.find((element) => element.id === Number(clickedEl.dataset.photoId));
//     renderFullscreenPost(clickedElData);
//     showFullscreenPost();
//   }
// };

export { editImgEl, resetScale, onScaleSmallerClick, onScaleBiggererClick, resetEffect, onEffectChange };
