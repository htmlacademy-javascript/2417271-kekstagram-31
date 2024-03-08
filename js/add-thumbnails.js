import {generateThread} from './generate-thread.js';

// На основе временных данных для разработки и шаблона создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

/* <template id="picture">
<a href="#" class="picture">
  <img class="picture__img" src="" width="182" height="182" alt="Случайная фотография"> img.src = post.url, alt = post.description  !
  <p class="picture__info">
    <span class="picture__comments"></span>  textConten = post.comments.length                                                      !
    <span class="picture__likes"></span>  textConten = post.likes                                                                   !
  </p>
</a>
</template> */

const thumbnailsContainer = document.querySelector('.pictures'); //контейнер. Для вставки элементов используйте DocumentFragment.
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const thumbnailsData = generateThread();

const thumbnailsFragment = document.createDocumentFragment();

const createThumbnail = (post) => {
  const newThumbnail = thumbnailTemplate.cloneNode(true);
  const thumbnailImg = newThumbnail.querySelector('.picture__img');
  const thumbnailComments = newThumbnail.querySelector('.picture__comments');
  const thumbnailLikes = newThumbnail.querySelector('.picture__likes');

  thumbnailImg.src = post.url;
  thumbnailImg.alt = post.description;
  thumbnailComments.textContent = post.comments.length;
  thumbnailLikes.textContent = post.likes;

  thumbnailsFragment.append(newThumbnail);
};

thumbnailsData.forEach((thumbnailObj) => createThumbnail(thumbnailObj));
thumbnailsContainer.append(thumbnailsFragment);

