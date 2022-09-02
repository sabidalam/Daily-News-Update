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
          <a class="nav-link ps-4 fw-semibold" href="#">${category.category_name}</a>
        `;
        displayCategory.appendChild(li);

    });
}

loadCategory();