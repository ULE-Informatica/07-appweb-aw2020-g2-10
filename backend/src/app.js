const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { sequelize } = require('./models');

const app = express();

app.use(bodyParser.json());
app.use(cors());

require('./routes')(app);

sequelize.sync()
    .then(() => {
        app.listen(3000);
        console.log(`\n---\n**Server started on port 3000**`);
        console.log(`\n---\n**DB connection success**`);
    });
