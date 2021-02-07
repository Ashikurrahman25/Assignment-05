
//Functionalities when search button is pressed
const handleSearch=(searchInput)=>{

    document.getElementById("DetailsPage").style.display = "none" ;
    //Show alert if search field is empty or white
    if(searchInput == "" || searchInput == " " || searchInput == undefined){
        showErrorMessage('Search field empty', 'Please write something to search')
        return;
    }


    deleteChildren(document.getElementById("meal-container"));
    doFetchRequest(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`, true);

}




//for requesting and receiving response from server with API
const doFetchRequest = (url, createCard )=>{
    fetch(url)
    .then(res=>res.json())
    .then(data => {

        //Handling null data
        if(data.meals === null) {          
            showErrorMessage('Sorry, Food Not Found!','Your searched food is not available in our database')
            return;
        }

        const meals = data.meals;
        if(createCard){
            meals.forEach(meal => {
                makeCard(meal.strMeal, meal.strMealThumb, meal.idMeal);          
            });
        }
        else{

            const ingredientsList =  document.getElementById("ingredients-list");
            deleteChildren(ingredientsList);
            handleIngredient(data.meals[0],ingredientsList);
        }
    })
    .catch(err => {
        console.error(err);
    });
}




//For dynamically making cards of food items
const makeCard = (name, imgSrc, mealID) =>{
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


    //Add click event to the card for showing the details 
    cardCol.addEventListener('click', function(event){

        document.documentElement.scrollTop = 0;
        
        document.getElementById("DetailsPage").style.display = "block" ;
        document.getElementById("meal-title").innerText = name;
        document.getElementById("meal-img").setAttribute("src", imgSrc) ;

        doFetchRequest(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);            
      })
}




//Get and show all the required ingredients with measures
const handleIngredient=(meal, ingredientsList) =>{
    let ingredients = [];
    let measure = [];

    for (let index = 0; index < 20; index++) {

        const elementIngredient = "strIngredient" + (index+1);
        const elementMeasure = "strMeasure" + (index+1);
        
        if(meal[elementIngredient]){
            const item = document.createElement('p');
            item.innerText = `${meal[elementIngredient]} ${meal[elementMeasure]}`;
            ingredientsList.appendChild(item);
        }
    }
}




//For deleting previous elements under a parent
const deleteChildren =(container) =>{
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}



//For showing error message
const showErrorMessage = (title,text) =>{

    swal({
        title: title,
        text: text,
        icon: "error",
        button: "Close",
      });
      
}
