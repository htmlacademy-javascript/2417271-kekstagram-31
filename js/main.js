import { getData } from './api.js';
import { ExchangeCondition, addInformMessage } from './inform-messages.js';
import { addThumbnails } from './add-thumbnails.js';
import { setEditFormSubmit } from './validate-form.js';
import { closeFullscreenEditor } from './edit-form-open-close.js';
import { setFilter } from './filtering-posts.js';

getData()
  .then((posts) => {
    addThumbnails(posts);
    setFilter(posts);
  })
  .catch(() => {
    addInformMessage(ExchangeCondition.GET_ERROR.condition);
  });

setEditFormSubmit(closeFullscreenEditor);
