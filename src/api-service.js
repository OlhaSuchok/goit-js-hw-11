const axios = require('axios').default;
export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.quantity = 40;
  }

  async fetchArticles() {
    const BASE_URL = 'https://pixabay.com/api';
    const API_KEY = '31897443-8d2d373622bb59a1b3cd97685';
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&per_page=40&page=${this.page}&orientation=horizontal&safesearch=true`;

    try {
      const response = await axios.get(url);
      console.dir(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  incrementQuantity() {
    return (this.quantity += 40);
  }
}
