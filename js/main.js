import { getData } from './api.js';
import { ExchangeCondition, addInformMessage } from './inform-messages.js';
import { addThumbnails } from './add-thumbnails.js';
import './fullscreen-post-open-close.js';
import { setEditFormSubmit } from './validate-form.js';
import { closeFullscreenEditor } from './edit-form-open-close.js';
import { showFilters } from './filtering-posts.js';

getData()
  .then((posts) => {
    addThumbnails(posts);
    showFilters(posts);
  })
  .catch(() => {
    addInformMessage(ExchangeCondition.GET_ERROR.condition);
  });

setEditFormSubmit(closeFullscreenEditor);
