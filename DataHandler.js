

function handleClick(searchInput){

    if(searchInput == "" || searchInput == " " || searchInput == undefined){

        return;
    }

    deleteChildren(document.getElementById("meal-container"));

    if(searchInput.length === 1){
        doFetchRequest(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput}`, true);
    }
    else{
        doFetchRequest(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`, true);
    }

}


const doFetchRequest = (url, createCard )=>{
    fetch(url).then(res=>res.json()).then(data => {
        const meals = data.meals;

        if(createCard){
            meals.forEach(meal => {
                makeCard(meal.strMeal, meal.strMealThumb, meal.idMeal);          
            });
        }

    }).catch(error => {
        console.log(error);
    })

}

function makeCard(name, imgSrc, mealID){
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
    cardTitle.id="meal-name";
    cardTitle.innerText = name;
    cardTitle.style.textAlign = 'center';

    foodContainer.appendChild(cardCol);
    cardCol.appendChild(card);
    card.appendChild(img);
    card.appendChild(cardBody);
    cardBody.appendChild(cardTitle);

    cardCol.addEventListener('click', function(event){
        console.log(mealID);
       
        document.getElementById("MainPage").style.display = "none";
        document.getElementById("DetailsPage").style.display = "block" ;
        document.getElementById("meal-title").innerText = name;

        const ingredientsList =  document.getElementById("ingredients-list");
        deleteChildren(ingredientsList);

        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`).then(res=>res.json()).then(data => {
           
        // console.log(data);
            handleIngredient(data.meals,ingredientsList);
    
        }).catch(error => {
            console.log(error);
        })
        
       
        
     })

}


function handleIngredient(meal, ingredientsList){
    let ingredients = [];
    let measure = [];

    if(meal[0].strIngredient1){
        ingredients.push(meal[0].strIngredient1);
        measure.push(meal[0].strMeasure1)
    }
    if(meal[0].strIngredient2){
        ingredients.push(meal[0].strIngredient2);
        measure.push(meal[0].strMeasure2)
    }
    if(meal[0].strIngredient3){
        ingredients.push(meal[0].strIngredient3);
        measure.push(meal[0].strMeasure3)
    }
    if(meal[0].strIngredient4){
        ingredients.push(meal[0].strIngredient4);
        measure.push(meal[0].strMeasure4)
    }
    if(meal[0].strIngredient5){
        ingredients.push(meal[0].strIngredient5);
        measure.push(meal[0].strMeasure5)
    }
    if(meal[0].strIngredient6){
        ingredients.push(meal[0].strIngredient6);
        measure.push(meal[0].strMeasure6)
    }
    if(meal[0].strIngredient7){
        ingredients.push(meal[0].strIngredient7);
        measure.push(meal[0].strMeasure7)
    }
    if(meal[0].strIngredient8){
        ingredients.push(meal[0].strIngredient8);
        measure.push(meal[0].strMeasure8)
    }
    if(meal[0].strIngredient9){
        ingredients.push(meal[0].strIngredient9);
        measure.push(meal[0].strMeasure9)
    }
    if(meal[0].strIngredient10){
        ingredients.push(meal[0].strIngredient10);
        measure.push(meal[0].strMeasure10)
    }
    if(meal[0].strIngredient11){
        ingredients.push(meal[0].strIngredient11);
        measure.push(meal[0].strMeasure11)
    }
    if(meal[0].strIngredient12){
        ingredients.push(meal[0].strIngredient12);
        measure.push(meal[0].strMeasure12)
    }
    if(meal[0].strIngredient13){
        ingredients.push(meal[0].strIngredient13);
        measure.push(meal[0].strMeasure13)
    }
    if(meal[0].strIngredient14){
        ingredients.push(meal[0].strIngredient14);
        measure.push(meal[0].strMeasure14)
    }
    if(meal[0].strIngredient15){
        ingredients.push(meal[0].strIngredient15);
        measure.push(meal[0].strMeasure15)
    }
    if(meal[0].strIngredient16){
        ingredients.push(meal[0].strIngredient16);
        measure.push(meal[0].strMeasure16)
    }
    if(meal[0].strIngredient17){
        ingredients.push(meal[0].strIngredient17);
        measure.push(meal[0].strMeasure17)
    }
    if(meal[0].strIngredient18){
        ingredients.push(meal[0].strIngredient18);
        measure.push(meal[0].strMeasure18)
    }
    if(meal[0].strIngredient19){
        ingredients.push(meal[0].strIngredient19);
        measure.push(meal[0].strMeasure19)
    }
    if(meal[0].strIngredient20){
        ingredients.push(meal[0].strIngredient20);
        measure.push(meal[0].strMeasure20)
    }
    
    ingredients.forEach(ingredient => {
   
        const item = document.createElement('p');
        item.innerText = `${ingredient} ${measure[ingredients.indexOf(ingredient)]}`;
        ingredientsList.appendChild(item);
    }); 
}


function deleteChildren(container){
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
