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







loadCategory();