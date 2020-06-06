const urls = require('../config/paths.json');
const axios = require('axios');

module.exports = {

    async isFavorito(req, res){

        console.log(req.params.producto)
        console.log(req.params.user)

        const route = urls.MUSICA.track + req.params.producto;

        axios.get(route)
        .then(response => {
            // handle success
            res.send(response.data);
        })
        .catch(error => {
            // handle error 
            res.status(400).send({
                error: 'Error obteniendo tracks',
            });
        })
        
    },
};
