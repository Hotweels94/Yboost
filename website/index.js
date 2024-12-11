const express = require("express");
const routerV100 = require('./router100');


const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const app = express();

const port = process.env.PORT || 8000;

app.use(morgan('combined')); 
app.use(cors()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({
        extended: true
    }));


app.use('/1.0.0',routerV100)
app.listen(port, () => console.log('Server app listening on port ' + port));