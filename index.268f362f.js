const e=document.querySelector(".search-form"),t=(document.querySelector('input[name="searchQuery"]'),document.querySelector('button[type="submit"]'),document.querySelector('button[type="button"]'));e.addEventListener("submit",(function(e){e.preventDefault(),r.query=e.currentTarget.elements.searchQuery.value,console.dir(r.query),r.resetPage(),r.fetchArticles()})),t.addEventListener("click",(function(){r.fetchArticles()}));const r=new class{fetchArticles(){console.log(this);const e=`https://pixabay.com/api/?key=31897443-8d2d373622bb59a1b3cd97685&q=${this.searchQuery}&image_type=photo&per_page=40&page=${this.page}`;fetch(e).then((e=>e.json())).then((e=>{this.incrementPage()}))}get query(){return this.searchQuery}set query(e){this.searchQuery=e}incrementPage(){this.page+=1}resetPage(){this.page=1}constructor(){this.searchQuery="",this.page=1}};console.log(r);
//# sourceMappingURL=index.268f362f.js.map