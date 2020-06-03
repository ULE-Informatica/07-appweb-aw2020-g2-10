const jwt = require('jsonwebtoken');
const { User } = require('../models');
const config = require('../config');

/**
 * Método para autenticar la API gracias a un token
 * @param {*} user 
 */
function jwtSignUser(user) {
    const ONE_WEEK = 60 * 60 * 24 * 7;
    return jwt.sign(user, 'secret', {
        expiresIn: ONE_WEEK,
    });
}

module.exports = {
    async register(req, res) {
        try {
            // Insertamos al usuario en la bdd
            const user = await User.create(req.body.credential);
            const userJson = user.toJSON();
            delete userJson.password;
            res.send({
                user: userJson,
                token: jwtSignUser(userJson),
            });
        } catch (err) {
            res.status(400).send({
                error: 'Error insertando usuario',
            });
        }
    }
};
