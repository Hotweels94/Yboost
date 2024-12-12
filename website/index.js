const express = require("express");
const routerV100 = require('./router100');


const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const app = express();
const path = require('path');
const { getCocktails } = require("./db/data");

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
    res.render('index');
});

app.get('/cocktails', function(req, res) {
    var listAllCocktails = getCocktails();
    res.render('cocktails',{listAllCocktails: listAllCocktails});
});


app.use('/1.0.0',routerV100)
app.listen(port, () => console.log('Server app listening on port ' + port));