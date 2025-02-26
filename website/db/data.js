//Require fs module to manipulate Json files
var fs = require('fs');

//Insert a cocktail int the API
function insertCocktail(cocktail) {
    //Get the existing cocktails
    var json = JSON.parse(fs.readFileSync('./db/data.json', 'utf-8'));

    //Generate a new ID by adding 1 to the biggest one of the list
    //If the list is empty, it gives the ID 1
    const newId = json.cocktails.length > 0 
        ? Math.max(...json.cocktails.map(c => c.id)) + 1 
        : 1;
    cocktail.id = newId;

    //Add the cocktail to the array
    json.cocktails.push(cocktail);

    //Rewritte the existing dtas by those who're in the array
    fs.writeFileSync('./db/data.json', JSON.stringify(json, null, 2), 'utf-8');

    return cocktail;
}

//Get a cocktail by its ID
function getCocktail(id_string) {
    console.log("fsjjfqq ");

    console.log("fsjjfqq " + id_string);

    //Transform the ID that we get from the URL into an int
    var id = parseInt(id_string,10);

    //Get the cocktails of our API
    var json = JSON.parse(fs.readFileSync('./db/data.json', 'utf-8'));

    //Search for the coktail with the good ID
    const cocktailById = json.cocktails.find(cocktail => cocktail.id === id);

    return cocktailById;

}

//Remove a cocktail by its ID
function removeCocktail(id_string) {
    //Transform the ID that we get from the URL into an int
    var id = parseInt(id_string, 10);

    //Get the cocktails of our API
    var json = JSON.parse(fs.readFileSync('./db/data.json', 'utf-8'));

    //Remove the cocktail with the good ID from the array
    json.cocktails = json.cocktails.filter(p => p.id !== id);

    //Rewritte the existing dtas by those who're in the array
    fs.writeFileSync('./db/data.json', JSON.stringify(json, null, 2), 'utf-8');

}

//Update a cocktail by its ID
function updateCocktail(cocktail) {
    //Get the cocktails of our API
    var json = JSON.parse(fs.readFileSync('./db/data.json', 'utf-8'));

    //Replace the coktail with the new one
    json.cocktails = json.cocktails.map(p => p.id === parseInt(cocktail.id, 10) ? cocktail : p);

    //Rewritte the existing dtas by those who're in the array
    fs.writeFileSync('./db/data.json', JSON.stringify(json, null, 2), 'utf-8');

} 

//Get all cocktails in the API
function getCocktails(){

    //Get the cocktails of our API
    var json = JSON.parse(fs.readFileSync('./db/data.json', 'utf-8'));

    return json.cocktails;
}

//Make the functions of this file usable by the other files
module.exports = {getCocktail, insertCocktail, updateCocktail, removeCocktail, getCocktails}