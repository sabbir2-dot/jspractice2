const handleSearch = () => {
    const inputVal = document.getElementById("search").value;
    if (inputVal.trim() === '') {
        return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputVal}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.meals) {
                displayMeals(data.meals);
            } else {
                alert('No Food found');
            }
        })
};

const displayMeals = (meals) => {
    const mealsContainer = document.getElementById("items");
    mealsContainer.innerHTML = ''; 
    meals.forEach((meal) => {
        const div = document.createElement("div");
        div.classList.add("col-md-3", "mb-4"); 
        div.innerHTML = `
            <div class="card h-100">
                <img src="${meal.strMealThumb || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${meal.strMeal}">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0, 80)}...</p>
                    <button type="button" class="btn btn-primary" onclick="handleDetails(${meal.idMeal})">Details</button>
                </div>
            </div>
        `;
        mealsContainer.appendChild(div);
    });
};

const handleDetails = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((res) => res.json())
        .then((data) => {
            if (data.meals && data.meals.length > 0) {
                displaySelectedMeal(data.meals[0]);
            }
        })
        
};

const displaySelectedMeal = (meal) => {
    const selectedMealContainer = document.getElementById("selectedMeal");
    selectedMealContainer.innerHTML = `
        <div class="card mb-4" style="max-width: 600px;">
            <img class="img-fluid w-50" src="${meal.strMealThumb || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${meal.strMeal}">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
            </div>
        </div>
    `;
};
