import './css/styles.css';

var _ = require('lodash');
import Notiflix from 'notiflix';

// user_id: 31955836;

import fetchPictures from './fetchPictures.js';

const getItemTemplate = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => {
  const str = `<div class="photo-card">
        <img src=${webformatURL} alt=${tags} loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            <p>${likes}</p>
          </p>
          <p class="info-item">
            <b>Views</b>
            <p>${views}</p>
          </p>
          <p class="info-item">
            <b>Comments</b>
            <p>${comments}</p>
          </p>
          <p class="info-item">
            <b>Downloads</b>
            <p>${downloads}</p>
          </p>
        </div>
      </div>`;
  return str;
};

const DEBOUNCE_DELAY = 300;
const URL = `https://pixabay.com/api/?key=31955836-4f23a30b6c1dc45c2c659779e`;
const PARAMETERS = `&image_type=photo&orientation=horizontal&safesearch=true`;

const refs = {
  form: document.querySelector(`.search-form`),
  list: document.querySelector(`.items-list`),
};

let picts = [];

refs.form.addEventListener(`submit`, handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const query = event.currentTarget.elements.searchQuery.value.trim();
  console.log(query);

  if (!query) {
    refs.list.innerHTML = ``;
    return;
  }

  fetchPictures(`${URL}&q=${query}${PARAMETERS}`)
    .then(items => {
      picts = items.hits;
      console.log(picts);
      render();
    })
    .catch(error => console.log(error));
}

function render() {
  // const amountOfCountryes = items.length;
  const list = picts.map(pict => getItemTemplate(pict)).join(``);
  console.log(list);
  refs.list.innerHTML = list;
  return;
}

// let items = [];

// refs.form.addEventListener(`input`, _.debounce(onInput, DEBOUNCE_DELAY));

// function onInput(event) {
//   event.preventDefault();
//   const query = event.target.value.trim();
//   console.log(query);

//   if (!query) {
//     refs.list.innerHTML = ``;
//     return;
//   }

//   fetchCountries(`${URL}${query}${PARAMETERS}`)
//     .then(countryes => {
//       items = countryes;
//       render();
//     })
//     .catch(error => console.log(error));
// }

// function render() {
//   const amountOfCountryes = items.length;
//   if (amountOfCountryes > 10) {
//     refs.list.innerHTML = ``;
//     Notiflix.Notify.info(
//       'Too many matches found. Please enter a more specific name.'
//     );
//     return;
//   }
//   if (amountOfCountryes > 1 && amountOfCountryes <= 10) {
//     const list = items.map(item => getItemTemplateSmall(item)).join(``);
//     refs.list.innerHTML = list;
//     return;
//   }
//   if (amountOfCountryes === 1) {
//     const list = items.map(item => getItemTemplateFull(item)).join(``);
//     refs.list.innerHTML = list;
//     return;
//   }
// }
