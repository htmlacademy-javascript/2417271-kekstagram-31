import { currentThread } from './generate-thread.js';
import { addThumbnails } from './add-thumbnails.js';
import './fullscreen-post-open-close.js';
import './edit-form-open-close.js';
import './filtering-thread.js';

addThumbnails(currentThread);