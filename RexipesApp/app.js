const searchBtn = document.getElementById('search-btn');
const recipeList = document.getElementById('recipe');
const recipeDetailsContent = document.querySelector('.recipe-content');
const recipeCloseBtn = document.querySelector('.recipe-content-close');
const recipeContentContainer = document.querySelector('.recipe-content-container');


// add event listeners
searchBtn.addEventListener('click', getRecipeList);
recipeList.addEventListener('click', getRecipeIngredients);
recipeCloseBtn.addEventListener('click', function() {
    recipeContentContainer.classList.add('closeRecipe');
    console.log(recipeContentContainer);
});


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
        else {
            html = "Sorry, you must enter only an ingredient like 'beef', or 'chicken'. Or we don't have that recipe.";
        }
        recipeList.innerHTML = html;
    })

    
}

function getRecipeIngredients(e) {
    e.preventDefault();
    recipeContentContainer.classList.remove('closeRecipe');
    if (e.target.classList.contains('recipe-btn')) {
        let recipeItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeItem.dataset.id}`)
        .then(response => response.json())
        .then(data => recipeModal(data.meals));
    }
}

function recipeModal(meal) {
    meal = meal[0];
    let html2 = `
        <h2>${meal.strMeal}</h2>
        <p class="recipe-category">${meal.strCategory}</p>
        <div class="recipe-details">
            <h3>Instructions</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class="recipe-content-img">
            <img src="${meal.strMealThumb}" alt="" class="food-img">
        </div>
    `;
    recipeDetailsContent.innerHTML = html2;
    recipeDetailsContent.parentElement.classList.add('showRecipe');
}
