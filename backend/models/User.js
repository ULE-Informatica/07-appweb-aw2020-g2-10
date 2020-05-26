const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    // attributes
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
    // options
    timestamps: false
});

module.exports = User; 