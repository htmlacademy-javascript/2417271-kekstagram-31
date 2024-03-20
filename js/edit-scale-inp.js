import { uploadImgFormEl, editorPreview } from './edit-form-open-close.js';

const SCALE_STEP = 25;
const SCALE_MIN_LIMIT = 25;
const SCALE_MAX_LIMIT = 100;
const SCALE_DEFAULT = 100;

const scaleSmallerButtonEl = uploadImgFormEl.querySelector('.scale__control--smaller');
const scaleBiggerButtonEl = uploadImgFormEl.querySelector('.scale__control--bigger');
const scaleInpEl = uploadImgFormEl.querySelector('.scale__control--value');

let currentScaleValue = parseInt(scaleInpEl.value, 10);

const editScale = () => {
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
  scaleInpEl.value = `${currentScaleValue}%`;
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
  scaleInpEl.value = `${currentScaleValue}%`;
  editScale();
};

export {
  scaleSmallerButtonEl,
  scaleBiggerButtonEl,
  resetScale,
  onScaleSmallerClick,
  onScaleBiggererClick
};
