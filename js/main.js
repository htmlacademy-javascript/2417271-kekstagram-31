import {generateThread} from './generate-thread.js';
import {addThumbnails} from './add-thumbnails.js';
import './filtering-thread.js';
import './edit-image.js';

addThumbnails(generateThread());
