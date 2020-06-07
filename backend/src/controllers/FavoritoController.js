const urls = require('../config/paths.json');
const axios = require('axios');
const { Favorito } = require('../models');

module.exports = {

    /**
     * Método para comprobar si el producto está en la lista de favoritos
     * @param {*} req 
     * @param {*} res 
     */
    async isFavorito(req, res) {

        try {

            // Obtenemos los parámetros
            const userId = req.query.userId;
            const trackId = req.query.trackId;

            if (userId === undefined || trackId === undefined)
                res.status(400).send({
                    error: 'Error obteniendo isFavorito',
                });
            else {
                // Buscamos el favorito
                const favorito = await Favorito.findOne({
                    where: {
                        producto: trackId,
                        UserId: userId,
                    },
                });

                if (favorito === null)
                    res.send(false);
                else res.send(true);
            }

        } catch (error) {
            // handle error 
            res.status(400).send({
                error: 'Error obteniendo isFavorito',
            });
        }
    },

    /**
     * Método para añadir un favorito a la lista de favoritos
     * @param {*} req 
     * @param {*} res 
     */
    async anadirFavorito(req, res) {

        try {
            // Obtenemos los parámetros
            const userId = req.body.params.userId;
            const trackId = req.body.params.trackId;
            const puntuacion = req.body.params.puntuacion;
            const comentario = req.body.params.comentario;

            if (comentario === undefined || puntuacion === undefined || trackId === undefined || userId === undefined)
                res.send(false);
            else {
                const favorito = await Favorito.create({
                    producto : trackId,
                    UserId : userId,
                    comentario : comentario,
                    puntuacion : puntuacion
                });

                res.send(favorito);
            }

        } catch (error) {
            res.status(500).send({
                error: 'Error añadiendo a favoritos',
            });
        }

    },

    /**
     * Método par eliminar un favorito de la lista de favoritos
     * @param {*} req 
     * @param {*} res 
     */
    async eliminarFavorito(req, res) {

        try {

            // Obtenemos los parámetros
            const userId = req.query.userId;
            const trackId = req.query.trackId;

            if (trackId === undefined || userId === undefined)
                res.send(false);
            else {
                const favorito = await Favorito.findOne({
                    where: {
                        producto: trackId,
                        UserId: userId,
                    },
                });

                if (favorito === null){
                    res.status(500).send({
                        error: 'Error añadiendo a favoritos',
                    });
                } else {
                    await favorito.destroy();
                    res.send(favorito);
                }
            }

        } catch (error) {
            res.status(500).send({
                error: 'Error añadiendo a favoritos',
            });
        }

    }
};
