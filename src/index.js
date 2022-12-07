import './css/styles.css';
import ApiService from './api-service';

const searchForm = document.querySelector('.search-form');
const inputEl = document.querySelector('input[name="searchQuery"]');
const searchButton = document.querySelector('button[type="submit"]');
const loadMoreButton = document.querySelector('button[type="button"]');

searchForm.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

const apiService = new ApiService();
console.log(apiService);

function onSearch(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.searchQuery.value;
  console.dir(apiService.query);

  apiService.resetPage();
  apiService.fetchArticles();
}

function onLoadMore() {
  apiService.fetchArticles();
}
