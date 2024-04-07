import { uploadImgFormEl } from './validate-form.js';

const UPLOAD_IMG_TYPES = ['jpg', 'jpeg', 'png'];
const SCALE_STEP = 25;
const SCALE_MIN_LIMIT = 25;
const SCALE_MAX_LIMIT = 100;
const SCALE_DEFAULT = 100;
const EffectsSetting = {
  CHROME: {
    filter: 'grayscale',
    minLimit: 0,
    maxLimit: 1,
    step: 0.1,
    start: 1,
    unit: ''
  },
  SEPIA: {
    filter: 'sepia',
    minLimit: 0,
    maxLimit: 1,
    step: 0.1,
    start: 1,
    unit: ''
  },
  MARVIN: {
    filter: 'invert',
    minLimit: 0,
    maxLimit: 100,
    step: 1,
    start: 100,
    unit: '%'
  },
  PHOBOS: {
    filter: 'blur',
    minLimit: 0,
    maxLimit: 3,
    step: 0.1,
    start: 3,
    unit: 'px'
  },
  HEAT: {
    filter: 'brightness',
    minLimit: 1,
    maxLimit: 3,
    step: 0.1,
    start: 3,
    unit: ''
  },
};

const uploadImgButtonEl = uploadImgFormEl.querySelector('#upload-file');
const editImgEl = uploadImgFormEl.querySelector('.img-upload__overlay');
const editorPreview = editImgEl.querySelector('.img-upload__preview img');
const effectPreviewList = editImgEl.querySelectorAll('.effects__preview');
const scaleInpEl = editImgEl.querySelector('.scale__control--value');
const sliderContainerEl = editImgEl.querySelector('.img-upload__effect-level');
const effectInpEl = sliderContainerEl.querySelector('#effect-level');
const effectSlider = sliderContainerEl.querySelector('.effect-level__slider');

// загрузка превью
const addPreview = () => {
  const file = uploadImgButtonEl.files[0];
  const fileName = file.name.toLowerCase();
  const matches = UPLOAD_IMG_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const fileUrl = URL.createObjectURL(file);
    editorPreview.src = fileUrl;
    effectPreviewList.forEach((preview) => (preview.style.backgroundImage = `url(${fileUrl})`));
  }
};


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
  if (currentScaleValue > SCALE_MIN_LIMIT) {
    currentScaleValue -= SCALE_STEP;
    editScale();
  }
};

const onScaleBiggererClick = () => {
  if (currentScaleValue < SCALE_MAX_LIMIT) {
    currentScaleValue += SCALE_STEP;
    editScale();
  }
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
  const { filter, unit } = EffectsSetting[effectType.toUpperCase()];
  effectInpEl.value = effectSlider.noUiSlider.get();
  editorPreview.style.filter = `${filter}(${effectInpEl.value}${unit})`;
};

const resetEffect = () => {
  editorPreview.style.removeProperty('filter');
  sliderContainerEl.classList.add('hidden');
  effectInpEl.value = '';
  effectSlider.noUiSlider.off('update', getEffectValue);
};

const changeEffect = (effectValue) => {
  sliderContainerEl.classList.remove('hidden');
  const { minLimit, maxLimit, step, start } = EffectsSetting[effectValue.toUpperCase()];
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

export {
  uploadImgButtonEl,
  editImgEl,
  addPreview,
  resetScale,
  onScaleSmallerClick,
  onScaleBiggererClick,
  resetEffect,
  onEffectChange
};
