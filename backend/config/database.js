const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config.json')[env];

// Creamos la conexión con la BDD
module.exports = new Sequelize(
    config.database, 
    config.username, 
    config.password, 
    config
);