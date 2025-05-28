const gallery = document.getElementById('gallery');

export function createImageCards(images) {
  const markup = images
    .map(
      img => `
    <a href="${img.largeImageURL}" class="gallery-item" title="${img.tags}">
      <img src="${img.webformatURL}" alt="${img.tags}" />
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${img.likes}</p>
        <p class="info-item"><b>Views:</b> ${img.views}</p>
        <p class="info-item"><b>Comments:</b> ${img.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${img.downloads}</p>
      </div>
    </a>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  gallery.innerHTML = '';
}
