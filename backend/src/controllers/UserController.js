const { User } = require('../models');

module.exports = {

    /**
     * Método para actualizar un usuario
     * @param {*} req 
     * @param {*} res 
     */
    async actualizar(req, res) {
        try {
            console.log(req);
            await User.update(req.body, {
                where: {
                    id: req.body.id,
                },
            });
            res.send({ updated: true });
        } catch (err) {
            res.status(500).send({
                error: 'Error in updating user profile',
            });
        }
    },
};
