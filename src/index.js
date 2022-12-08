import './css/styles.css';
import ApiService from './api-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const searchButton = document.querySelector('button[type="submit"]');
const loadMoreButton = document.querySelector('button[type="button"]');
const imageWrapper = document.querySelector('.gallery');
loadMoreButton.classList.add('hide');
let galleryItem = new SimpleLightbox('.gallery a');

searchForm.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

const apiService = new ApiService();
console.log(apiService);

function onSearch(event) {
  event.preventDefault();
  clearArticlesContainer();
  apiService.resetPage();
  apiService.query = event.currentTarget.elements.searchQuery.value;

  if (apiService.query === '') {
    return;
  }

  apiService.fetchArticles().then(hits => {
    oncreateMarkup(hits);

    console.log(hits);
    console.log(hits.length);
    console.log(hits.totalHits);

    if (hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
  });
}

function onLoadMore() {
  apiService.fetchArticles().then(hits => {
    oncreateMarkup(hits);
  });
}

function oncreateMarkup(hits) {
  const markupArticles = hits
    .map(hit => {
      return `<div class="photo-card" style = "display: flex; flex-direction: row">
         <a href="${hit.largeImageURL}">
  <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${hit.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${hit.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${hit.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${hit.downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');
  imageWrapper.insertAdjacentHTML('beforeend', markupArticles);
  loadMoreButton.classList.remove('hide');
  galleryItem.refresh();
}

function clearArticlesContainer() {
  imageWrapper.innerHTML = '';
}
