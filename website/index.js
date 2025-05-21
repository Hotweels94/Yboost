const express = require("express");
const routerV100 = require('./router100');

const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const { getCocktails } = require("./db/data");
const { con } = require("./userdb/userdata");

const fs = require('fs');

const port = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('combined')); 
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
        extended: true
    }));

app.get('/', function(req, res) {
    res.render('index', { created: req.query.created });
});

app.get('/cocktails', function(req, res) {
    var listAllCocktails = getCocktails();
    res.render('cocktails',{listAllCocktails: listAllCocktails});
});

app.get("/addCocktail", (_, res) => {
    res.render('addCocktail');
});


app.post("/addCocktail", async (req, res) => {
    const { name, realCocktail, characterSmash, description, receipe, image, imageHover, ingredient, quantity, unit } = req.body;

    // Vérification et construction des ingrédients
    let ingredients = [];

    if (Array.isArray(ingredient)) {
        // Cas où plusieurs ingrédients sont envoyés
        for (let i = 0; i < ingredient.length; i++) {
            if (ingredient[i] && quantity[i] && unit[i]) { // Vérification que les champs ne sont pas vides
                ingredients.push({
                    ingredient: ingredient[i],
                    quantity: Number(quantity[i]),
                    unit: unit[i]
                });
            }
        }
    } else if (ingredient && quantity && unit) {
        // Cas où un seul ingrédient est envoyé
        ingredients.push({
            ingredient: ingredient,
            quantity: Number(quantity),
            unit: unit
        });
    }

    // Validation des données requises
    if (!name || !realCocktail || !characterSmash || !description || !receipe || !image || ingredients.length === 0) {
        return res.status(400).send("Tous les champs obligatoires doivent être remplis");
    }

    const json = JSON.parse(fs.readFileSync("db/data.json", "utf-8"));

    // Nouvel ID
    const newId = json.cocktails.length > 0
        ? Math.max(...json.cocktails.map(c => c.id)) + 1
        : 1;

    const newCocktail = {
        id: newId,
        name,
        description,
        realCocktail,
        characterSmash,
        receipe,
        ingredients,
        image,
        imageHover // Ajout du champ imageHover
    };

    json.cocktails.push(newCocktail);
    fs.writeFileSync("db/data.json", JSON.stringify(json, null, 2), "utf-8");
    res.redirect("/");
});


app.get("/users", async (req, res) => {
        const result = await con.query("SELECT id, username, email FROM users");
        res.render('createuser', { users: result.rows });
});

app.use('/1.0.0',routerV100)
app.use('/',routerV100)

app.listen(port, () => console.log('Server app listening on port ' + port + ': http://localhost:8000'));