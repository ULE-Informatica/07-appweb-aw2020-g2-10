const { User } = require('../models');

module.exports = {

    /**
     * Método para actualizar un usuario
     * @param {*} req 
     * @param {*} res 
     */
    async actualizar(req, res) {
        try {
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

    async getUser(req, res) {

        try {

            const usuario = await User.findOne({
                where: {
                    id: req.params.userId,
                },
            });

            if (usuario != null)
                res.send({
                    username: usuario.username,
                    avatar: usuario.avatar,
                });
            else
                res.status(500).send({
                    error: 'Error obteniendo info de user',
                });

        } catch (error) {
            res.status(500).send({
                error: 'Error obteniendo info de user',
            });
        }

    }
};
