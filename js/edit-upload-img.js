import { uploadImgFormEl } from './validate-form.js';

const SCALE_STEP = 25;
const SCALE_MIN_LIMIT = 25;
const SCALE_MAX_LIMIT = 100;
const SCALE_DEFAULT = 100;
const EffectsSetting = {
  chrome: {
    filter: 'grayscale',
    minLimit: 0,
    maxLimit: 1,
    step: 0.1,
    start: 1,
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    minLimit: 0,
    maxLimit: 1,
    step: 0.1,
    start: 1,
    unit: ''
  },
  marvin: {
    filter: 'invert',
    minLimit: 0,
    maxLimit: 100,
    step: 1,
    start: 100,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    minLimit: 0,
    maxLimit: 3,
    step: 0.1,
    start: 3,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    minLimit: 1,
    maxLimit: 3,
    step: 0.1,
    start: 3,
    unit: ''
  },
};

const editImgEl = uploadImgFormEl.querySelector('.img-upload__overlay');
const editorPreview = editImgEl.querySelector('.img-upload__preview').querySelector('img');
const scaleInpEl = editImgEl.querySelector('.scale__control--value');
const sliderContainenrEl = editImgEl.querySelector('.img-upload__effect-level');
const effectInpEl = sliderContainenrEl.querySelector('#effect-level');
const effectSlider = sliderContainenrEl.querySelector('.effect-level__slider');

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
noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  },
});

const getEffectValue = () => {
  const effectType = effectSlider.dataset.effect;
  const { filter, unit } = EffectsSetting[effectType];
  effectInpEl.value = effectSlider.noUiSlider.get();
  editorPreview.style.filter = `${filter}(${effectInpEl.value}${unit})`;
};

const resetEffect = () => {
  editorPreview.style.removeProperty('filter');
  sliderContainenrEl.classList.add('hidden');
  effectInpEl.value = '';
  effectSlider.noUiSlider.off('update', getEffectValue);
};

const changeEffect = (effectValue) => {
  sliderContainenrEl.classList.remove('hidden');
  const { minLimit, maxLimit, step, start } = EffectsSetting[effectValue];
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: minLimit,
      max: maxLimit,
    },
    start: start,
    step: step,
  });
};

const onEffectChange = (evt) => {
  if (evt.target.name === 'effect') {
    resetEffect();
    const effectType = evt.target.value;
    if (effectType !== 'none') {
      effectSlider.dataset.effect = effectType;
      changeEffect(effectType);
      effectSlider.noUiSlider.on('update', getEffectValue);
    }
  }
};

export { editImgEl, resetScale, onScaleSmallerClick, onScaleBiggererClick, resetEffect, onEffectChange };
