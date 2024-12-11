var cocktails=[
    {id:0,name:'Grosse Potion', description:'Te fait planer looontemps', receipe: 'C secret', ingredients:'la zaza du coin, 3 redbulls', image:'https://i.ytimg.com/vi/J-QeoOd3HLQ/maxresdefault.jpg', character:'Sonic'},
    {id:1,name:'Petite Potion', description: 'Ptit decontractant', receipe: 'Cuire lherbe a 150°C dans le four en mode chaleur tournante', ingredients:'Herbe, 200 ml de jus', image: 'https://static.wikia.nocookie.net/fortnite/images/e/e4/MiniPotion.png/revision/latest?cb=20180901140139&path-prefix=fr', character:'Rondoudou'}
];
function insertCocktail(p) {
    p.id = cocktails.length;
    cocktails.push(p);
    return p;
}

function getCocktail(id) {
    return cocktails.find(p => p.id === +id);
    }
function removeCocktail(id) {
    cocktails = cocktails.filter(p => p.id !== +id);
    }
function updateCocktail(cocktail) {
    cocktails = cocktails.map(p => p.id === +cocktail.id ? cocktail : p);
    }

function getCocktails(){
    return cocktails;
    }

module.exports = {getCocktail, insertCocktail, updateCocktail, removeCocktail, getCocktails}