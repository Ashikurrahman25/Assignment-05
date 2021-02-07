


const doFetchRequest = url =>{
    fetch(url).then(res=>res.json()).then(data => {
        const meals = data.meals;
        console.log(meals);
        meals.forEach(meal => {
            makeCard(meal.strMeal, meal.strMealThumb);          
        });

    })

}

function makeCard(name, imgSrc){
    const foodContainer = document.getElementById("meal-container");

    const cardCol = document.createElement('div');
    cardCol.className="col";

    const card = document.createElement('div');
    card.className = "card";
    card.id ="meal";


    const img = document.createElement('img');
    img.className = "card-img-top";
    img.setAttribute('src', imgSrc);

    const cardBody = document.createElement('div');
    cardBody.className = "card-body";
    
    const cardTitle = document.createElement('h5');
    cardTitle.className = "card-title";
    cardTitle.innerText = name;
    cardTitle.style.textAlign = 'center';

    foodContainer.appendChild(cardCol);
    cardCol.appendChild(card);
    card.appendChild(img);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);

}

doFetchRequest("https://www.themealdb.com/api/json/v1/1/search.php?s=penne");
