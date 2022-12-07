export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    console.log(this);
    const url = `https://pixabay.com/api/?key=31897443-8d2d373622bb59a1b3cd97685&q=${this.searchQuery}&image_type=photo&per_page=40&page=${this.page}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
      });
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
}
