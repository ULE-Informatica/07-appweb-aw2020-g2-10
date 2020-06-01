const Sequelize = require('sequelize');
const db = require('../config/database');

const Product = db.define('user', {
    // attributes
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    artist: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    image: {
        type: Sequelize.STRING
    }
}, {
    // options
    timestamps: false
});

module.exports = Product; 