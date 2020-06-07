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
    },
    async login(req, res) {
        try {
            const { username, password } = req.body.credential;
            const user = await User.findOne({
                where: {
                    username,
                },
            });
            if (!user) {
                res.status(403).send({
                    error: 'El usuario no existe',
                });
            }
            if (user.dataValues.password != password){
                res.status(403).send({
                    error: 'La contraseña es incorrecta',
                });
            }
            const userJson = user.toJSON();
            delete userJson.password;
            res.send({
                user: userJson,
                token: jwtSignUser(userJson),
            });
        } catch (err) {
            console.log(err);
            res.status(500) .send({
                error: 'Error interno',
            });
        }
    },
};
