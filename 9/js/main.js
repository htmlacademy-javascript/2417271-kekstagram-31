import {currentThread} from './generate-thread.js';
import {addThumbnails} from './add-thumbnails.js';
import {thumbnailsContainerEl, onThumbnailClick} from './fullscreen-post-open-close.js';
import {uploadImgButtonEl, onuploudButtionClick} from './edit-form-open-close.js';
import './validate-form.js';
import './filtering-thread.js';

addThumbnails(currentThread);
thumbnailsContainerEl.addEventListener('click', onThumbnailClick.bind(null, currentThread));
uploadImgButtonEl.addEventListener('change', onuploudButtionClick);
