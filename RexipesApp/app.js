const searchBtn = document.getElementById('search-btn');
const recipeList = document.getElementById('recipe');
const recipeDetailsContent = document.querySelector('.recipe-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// add event listeners
searchBtn.addEventListener('click', getRecipeList);

// get recipe list from user search
function getRecipeList() {
    let searchInput = document.getElementById('search-input').value.trim();
    
    // create fetch
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals) {
            data.meals.forEach(meal => {
                html += `<div class="recipe-item" data-id="${meal.idMeal}">
                            <div class="recipe-img">
                                 <img src="${meal.strMealThumb}" alt="">
                            </div>
                            <div class="recipe-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="recipe-btn">Get Recipe</a>
                            </div>
                        </div>`;
            })
        }
        recipeList.innerHTML = html;
    })

    
}