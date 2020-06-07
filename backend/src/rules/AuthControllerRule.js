const Joi = require('joi');

module.exports = {
    requirement(req, res, next) {
        if (!req.body.credential) {
            console.log("Los credenciales no pueden ser vacíos.")
            res.status(403).send({
                error: 'Los credenciales no pueden ser vacíos',
            });
        } else next();
    },

    register(req, res, next) {
        // Comprobamos los campos introducidos por el usuario
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{6,32}$/),
            name: Joi.string().alphanum(),
            username: Joi.string(),
            avatar: Joi.string().regex(/^[0-9][0-9][0-9]$/)
        });

        const { error } = Joi.validate(req.body.credential, schema);
        
        if (error) {
            console.log('Información inválida');
            res.status(400).send({
                error: 'Información inválida',
            });
        } else next();
    },
};
