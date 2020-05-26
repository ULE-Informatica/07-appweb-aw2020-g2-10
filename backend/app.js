var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors')

const User = require('./models/User');

// Database
const db = require('./config/database');

// Para comprobar la conexión a la BDD
db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cors())

app.get('/', function (req, res) {
    User.findAll()
        .then(users => {
            console.log(users);
            res.sendStatus(200);
        })
        .catch(err => console.log(err));
});

app.get('/data', function (req, res) {

    const data = {
        firstName: 'Jorge',
        lastName: 'Garcia'
    };

    let { id, firstName, lastName } = data;

    // Insert into table
    User.create({
        id: id,
        firstName: firstName,
        lastName: lastName
    })
        .then(user => console.log(user))
        .catch(err => console.log(err));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});