import axios from 'axios';
import './css/styles.css';
import Notiflix from 'notiflix';

var _ = require('lodash');

// user_id: 31955836;

import getPictures from './fetchPictures.js';

const getItemTemplate = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  const str = `<li class="item">
                <div class="photo-card">
                  <img src=${webformatURL} alt=${tags} loading="lazy" width="220" height="140" class="items-image"/>
                  <div class="info">
                    <p class="info-item">
                      <b>Likes</b><br>${likes}
                    </p>
                    <p class="info-item">
                      <b>Views</b><br>${views}
                    </p>
                    <p class="info-item">
                      <b>Comments</b><br>${comments}
                    </p>
                    <p class="info-item">
                      <b>Downloads</b><br>${downloads}     
                    </p>
                  </div>
                </div>
               </li>`;
  return str;
};

const URL = `https://pixabay.com/api/?key=31955836-4f23a30b6c1dc45c2c659779e`;
const PARAMETERS = `&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`;

const refs = {
  form: document.querySelector(`.search-form`),
  list: document.querySelector(`.items-list`),
  btn: document.querySelector(`.load-more`),
};

let query = ``;
let picts = [];
let pageNumber = 1;
let numberOfPages = 1;

refs.form.addEventListener(`submit`, handleSubmit);
refs.btn.addEventListener(`click`, addPictures);

// refs.btn.setAttribute(`disabled`, true);
refs.btn.classList.add('is-hidden');

function handleSubmit(event) {
  event.preventDefault();

  query = event.currentTarget.elements.searchQuery.value.trim();
  console.log(query);

  refs.list.innerHTML = ``;
  pageNumber = 1;

  if (!query) {
    refs.btn.classList.add('is-hidden');
    return;
  }

  getPictures(`${URL}&q=${query}${PARAMETERS}&page=${pageNumber}`)
    .then(({ data }) => {
      numberOfPages = Math.ceil(data.totalHits / 40);
      console.log(numberOfPages);

      picts = data.hits;
      console.log(picts.length);

      if (picts.length === 0) {
        refs.btn.classList.add('is-hidden');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      // const notyString = data.totalHits;
      // console.log(`кол-во изображений ${notyString}`);
      // Notiflix.Notify.info('Hooray! We found ${notyString} images.');
      render();
      pageNumber += 1;
      // refs.btn.removeAttribute(`disabled`);
      refs.btn.classList.remove('is-hidden');
    })
    .catch(error => console.log(error));
}

function render() {
  const list = picts.map(pict => getItemTemplate(pict)).join(``);
  refs.list.insertAdjacentHTML('beforeend', list);
  return;
}

function addPictures() {
  getPictures(`${URL}&q=${query}${PARAMETERS}&page=${pageNumber}`)
    .then(({ data }) => {
      picts = data.hits;
      console.log(picts);
      render();
      pageNumber += 1;
    })
    .catch(error => console.log(error));

  if (pageNumber >= numberOfPages) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    // refs.btn.setAttribute(`disabled`, true);
    refs.btn.classList.add('is-hidden');
    return;
  }
}
