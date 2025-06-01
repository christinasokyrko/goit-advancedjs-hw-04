import { fetchImages, perPage } from './js/pixabay-api.js';
import { createImageCards, clearGallery, toggleLoadMore } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('form');
const input = document.getElementById('search-input');
const loader = document.getElementById('loader');
const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more-btn');

let query = '';
let page = 1;
let totalHits = 0;

const lightbox = new SimpleLightbox('.gallery a');

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = input.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'The search field cannot be empty!',
      position: 'bottomCenter',
      backgroundColor: 'red',
      messageColor: 'white',
    });
    return;
  }

  page = 1;
  clearGallery();
  toggleLoadMore(false);
  loader.classList.remove('hidden');

  try {
    const data = await fetchImages(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({
        message: 'Sorry, no images match your search query.',
        position: 'bottomCenter',
        backgroundColor: 'red',
        messageColor: 'white',
      });
      return;
    }

    createImageCards(data.hits);
    lightbox.refresh();

    if (totalHits > perPage) {
      window.addEventListener('scroll', handleScrollToShowLoadMore);
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

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loader.classList.remove('hidden');

  try {
    const data = await fetchImages(query, page);
    createImageCards(data.hits);
    lightbox.refresh();

    const totalPages = Math.ceil(totalHits / perPage);
    if (page >= totalPages) {
      toggleLoadMore(false);
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'bottomCenter',
        backgroundColor: 'red',
        messageColor: 'white',
      });
    }

    smoothScroll();

  } catch (error) {
    iziToast.error({
      message: 'Failed to load more images',
      position: 'bottomCenter',
      backgroundColor: 'red',
      messageColor: 'white',
    });
    console.error(error);
  } finally {
    loader.classList.add('hidden');
  }
});

function smoothScroll() {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function handleScrollToShowLoadMore() {
  const { bottom } = gallery.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (bottom <= windowHeight) {
    toggleLoadMore(true);
    window.removeEventListener('scroll', handleScrollToShowLoadMore);
  }
}

//HJJJJJ