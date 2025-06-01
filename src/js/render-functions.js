const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more-btn');

export function createImageCards(images) {
  const markup = images
    .map(
      img => `
      <li>
        <a href="${img.largeImageURL}" class="gallery-item" title="${img.tags}">
          <img src="${img.webformatURL}" alt="${img.tags}" />
          <div class="info">
            <p class="info-item"><b>Likes:</b> ${img.likes}</p>
            <p class="info-item"><b>Views:</b> ${img.views}</p>
            <p class="info-item"><b>Comments:</b> ${img.comments}</p>
            <p class="info-item"><b>Downloads:</b> ${img.downloads}</p>
          </div>
        </a>
      </li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function toggleLoadMore(show) {
  loadMoreBtn.classList.toggle('hidden', !show);
}
