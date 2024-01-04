/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    for(let i = 0;i<games.length; i++){
        const gamecard = document.createElement("div");

        gamecard.classList.add("gamecard");


        gamecard.innerHTML = `
        <img src="${games[i].img}" alt="${games[i].title}" class="game-img" />
        <p>${games[i].description}</p>
        <p>Backers: ${games[i].backers}</p>
        
    `;

        gamesContainer.appendChild(gamecard);

        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
    }
   
}
addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

const totalcontrib = GAMES_JSON.reduce((acc,games) => {
    return acc+games.backers;},0);

    contributionsCard.innerHTML =  `<p>${totalcontrib.toString()}</p>`

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalraised = GAMES_JSON.reduce((acc,games)=> {
    return acc+games.pledged;
},0);
raisedCard.innerHTML = `<p>$${totalraised.toString()}</p>`
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalgames= GAMES_JSON.reduce((acc,currentval)=>{
    return acc+1;
},0);
gamesCard.innerHTML = `<p>${totalgames.toString()}</p>`

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    let unfundedgames = GAMES_JSON.filter(game => game.pledged < game.goal);


    addGamesToPage(unfundedgames);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    let fundedgames = GAMES_JSON.filter(game => game.pledged >= game.goal);

addGamesToPage(fundedgames);
    // use the function we previously created to add unfunded games to the DOM

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener("click",function(){
    filterUnfundedOnly();
});
fundedBtn.addEventListener("click",function(){
    filterFundedOnly();
});
allBtn.addEventListener("click",function(){
    showAllGames();
})

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");
descriptionContainer.addClass
let unfundedgames = GAMES_JSON.filter(game => game.pledged < game.goal).length;


const displStr = unfundedgames === 0
  ? "All games are funded!"
  : `${unfundedgames} game${unfundedgames=== 1 ? '' : 's'} ${
      unfundedgames === 1 ? 'is' : 'are'
    } still unfunded.`;
    
const existingContent = descriptionContainer.innerHTML;

const displtxt =existingContent +`
<p>So far, we've raised $${totalraised.toLocaleString()} for ${totalgames} games.</p>
<p>${displStr}</p>
`;

descriptionContainer.innerHTML = displtxt;


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});
const [firstGame, secondGame, ...restOfGames] = sortedGames;

// Create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGameElement = document.createElement("div");
firstGameElement.classList.add("top-game");
firstGameElement.innerHTML = `
    <p>${firstGame.name}</p>
    <p>Pledged: $${firstGame.pledged.toLocaleString()}</p>
`;

firstGameContainer.appendChild(firstGameElement);

// Do the same for the runner-up item
const secondGameElement = document.createElement("div");
secondGameElement.classList.add("top-game");
secondGameElement.innerHTML = `
    <p>${secondGame.name}</p>
    <p>Pledged: $${secondGame.pledged.toLocaleString()}</p>
`;

secondGameContainer.appendChild(secondGameElement);

let themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => {

    document.body.classList.toggle("dark-mode");
    document.querySelector('.header').classList.toggle("dark-mode-header");
    const gameCards = document.querySelectorAll('.gamecard');
    gameCards.forEach(card => {
        card.classList.toggle('dark-mode-gamecard');
    });
}
themeButton.addEventListener("click", toggleDarkMode);