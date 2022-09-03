const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
}


const displayCategory = (categories) => {
    console.log(categories);
    const displayCategory = document.getElementById('displayCategory');
    categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `
          <a class="nav-link fw-semibold btn" href="#" onclick ="loadNews('${category.category_id}')">${category.category_name}</a>
        `;
        displayCategory.appendChild(li);

    });
}


const loadNews = (id) => {
    const url = ` https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data));

}

const displayNews = allNews => {
    console.log(allNews);
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    allNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div class="card p-4">
        <div class="row g-0">
          <div class="col-12 col-sm-12 col-md-4">
            <img src="${news.thumbnail_url}" class="card-img-top img-fluid rounded" alt="">
          </div>  
          <div class="col-md-8">  
            <div class="card-body p-5">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.details.slice(0, 700)}....</p>
            </div>
           
          </div>   
        </div>
         </div>               
        `;
        newsContainer.appendChild(newsDiv);

    });

}





loadCategory();