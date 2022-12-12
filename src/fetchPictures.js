import Notiflix from 'notiflix';

export default function fetchPictures(name) {
  return fetch(name).then(response => {
    if (response.ok) {
      return response.json();
    } else {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      // refs.list.innerHTML = ``;
    }
  });
}
