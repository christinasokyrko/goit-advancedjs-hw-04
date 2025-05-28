import { fetchImages } from './js/pixabay-api.js';
import { createImageCards, clearGallery } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const loader = document.getElementById('loader');
const gallery = document.getElementById('gallery');

const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'The search field cannot be empty!',
      position: 'bottomCenter',
      backgroundColor: 'red',
      messageColor: 'white',
    });
    return;
  }

  loader.classList.remove('hidden');
  clearGallery();

  try {
    const images = await fetchImages(query);

    if (images.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'bottomCenter',
        backgroundColor: 'red',
        messageColor: 'white',
      });
    } else {
      createImageCards(images);
      lightbox.refresh();
    }
  } catch (error) {
    iziToast.error({
      message: 'An error occurred while retrieving images',
      position: 'bottomCenter',
      backgroundColor: 'red',
      messageColor: 'white',
    });
    console.error(error);
  } finally {
    loader.classList.add('hidden');
  }
});
