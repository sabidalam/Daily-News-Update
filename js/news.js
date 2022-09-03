const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategory(data.data.news_category))
        .catch((error) => {
            console.log('There is an error', error)
        });
}


const displayCategory = (categories) => {
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
    taggleSpinner(true);
    const url = ` https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
        .catch((error) => {
            console.log('There is an error', error)
        });

}

const displayNews = allNews => {
    console.log(allNews);
    const sort = allNews.sort((a, b) => b.total_view - a.total_view);
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
                <p class="card-text">${news.details.slice(0, 400)}....</p>
            </div>
            <div class="d-flex justify-content-around">
              <div class="d-flex">
                <div>
                  <img src="${news.author.img ? news.author.img : 'No image found'}" class="card-img-top img-fluid rounded-circle me-3" alt="" style="height: 50px; width:50px;">
                </div>
                <div>
                <p class="card-text mb-0 fw-semibold">${news.author.name ? news.author.name : 'No auther name found'}</p>
                <span>${news.author.published_date ? news.author.published_date : 'Published date not found'}</span>
                </div>
              </div>
              <p class="mt-3"><i class="fa-solid fa-eye"></i> ${news.total_view ? news.total_view : 'No views found'}</p>
              <p class="mt-3">rating: ${news.rating.number ? news.rating.number : 'No rating found'} <span><i class="fa-solid fa-star-half-stroke"></i></span></p>
              <div class="mt-1">
              <button type="button" id="news-details-btn" class="btn btn-primary px-2"
                onclick="loadNewsDetails('${news._id}')" data-bs-toggle="modal" data-bs-target="#newsdetailsModal">Details</button>
                </div>
            </div>
          </div>   
        </div>
         </div>               
        `;
        newsContainer.appendChild(newsDiv);

    });
    // no news found
    const noNewsFound = document.getElementById('no-news-found');
    if (allNews.length === 0) {
        noNewsFound.classList.remove('d-none');
    } else {
        noNewsFound.classList.add('d-none');
    }
    taggleSpinner(false);
    // news list 
    const newsList = document.getElementById('news-list');
    if (allNews.length !== 0) {
        newsList.value = (allNews.length + ' items found for this Category');
    } else {
        newsList.value = 'No items found';
    }


}

const taggleSpinner = isLoading => {
    const spinner = document.getElementById('spinner');
    if (isLoading) {
        spinner.classList.remove('d-none');
    } else {
        spinner.classList.add('d-none');
    }
}

const loadNewsDetails = id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetails(data.data[0]))
        .catch((error) => {
            console.log('There is an error', error)
        });

}

const displayNewsDetails = news => {
    console.log(news);
    const modalTitle = document.getElementById('newsdetailsModalLabel');
    modalTitle.innerText = news.title;
    const newsDetalis = document.getElementById('news-Details');
    newsDetalis.innerHTML = `
        <div class="d-flex justify-content-between">
        <p class="fw-semibold">Author: ${news.author.name ? news.author.name : 'No auther name found'}</p>
        <p class="fw-semibold">Published Date: ${news.author.published_date ? news.author.published_date : 'Published date not found'}</p>
        <p class="fw-semibold">Views:  ${news.total_view ? news.total_view : 'No views found'}</p>
        </div>
        <p>Detail: ${news.details}</p>
        <img src="${news.thumbnail_url}" class="card-img-top img-fluid" alt="">
    `;

}


loadCategory();