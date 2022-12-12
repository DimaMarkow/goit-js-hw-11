import axios from 'axios';
import Notiflix from 'notiflix';

export default async function getPictures(name) {
  try {
    const response = await axios.get(name);
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
}

// export default function fetchPictures(name) {
//   return fetch(name).then(response => {
//     if (response.ok) {
//       return response.json();
//     } else {
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     }
//   });
// }
