import './css/styles.css';
import ApiService from './api-service';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchForm = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const searchButton = document.querySelector('button[type="submit"]');
const loadMoreButton = document.querySelector('button[type="button"]');
const imageWrapper = document.querySelector('.gallery');

searchForm.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

const apiService = new ApiService();
console.log(apiService);

function onSearch(event) {
  event.preventDefault();
  clearArticlesContainer();
  apiService.query = event.currentTarget.elements.searchQuery.value;
  console.dir(apiService.query);

  // if (articles.hits === 0) {
  //   Notify.failure(
  //     'Sorry, there are no images matching your search query. Please try again.'
  //   );
  //   return;
  // }

  apiService.resetPage();
  apiService.fetchArticles().then(articles => {
    console.log(articles);
    oncreateMarkup(articles.hits);
    console.log(articles.hits.length);
  });
}

function onLoadMore() {
  apiService.fetchArticles().then(articles => {
    oncreateMarkup(articles.hits);
  });
}

function oncreateMarkup(articles) {
  const markupArticles = articles
    .map(article => {
      return `<div class="photo-card" style = "display: flex; flex-direction: row">
  <img href="${article.largeImageURL}" src="${article.webformatURL}" alt="${article.tags}" loading="lazy" width="240"/>
  <div class="info">
    <p class="info-item">
      <b>Likes ${article.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${article.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${article.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${article.downloads}</b>
    </p>
  </div>
</div>`;
    })
    .join('');
  imageWrapper.insertAdjacentHTML('afterbegin', markupArticles);
}

function clearArticlesContainer() {
  imageWrapper.innerHTML = '';
}
