import './css/styles.css';
import ApiService from './api-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let galleryItem = new SimpleLightbox('.gallery a');

const searchForm = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const searchButton = document.querySelector('button[type="submit"]');
const loadMoreButton = document.querySelector('button[type="button"]');
const imageWrapper = document.querySelector('.gallery');
loadMoreButton.classList.add('hide');

searchForm.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

const apiService = new ApiService();
console.log(apiService);

async function onSearch(event) {
  event.preventDefault();
  clearArticlesContainer();
  apiService.resetPage();
  apiService.query = event.currentTarget.elements.searchQuery.value;

  if (apiService.query === '') {
    loadMoreButton.classList.add('hide');
    return;
  }

  const {
    data: { hits, totalHits },
  } = await apiService.fetchArticles();
  oncreateMarkup(hits);

  if (hits.length === 0) {
    loadMoreButton.classList.add('hide');
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  Notify.success(`Hooray! We found ${totalHits} images.`);
}

async function onLoadMore() {
  apiService.incrementPage();
  const quantity = apiService.incrementQuantity();

  const {
    data: { hits, totalHits },
  } = await apiService.fetchArticles();
  oncreateMarkup(hits);

  if (quantity > totalHits) {
    loadMoreButton.classList.add('hide');
    Notify.info("We're sorry, but you've reached the end of search results.");
    return;
  }
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
  galleryItem.refresh();
  loadMoreButton.classList.remove('hide');
}

function clearArticlesContainer() {
  imageWrapper.innerHTML = '';
}
