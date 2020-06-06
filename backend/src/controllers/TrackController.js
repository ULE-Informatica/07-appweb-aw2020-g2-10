const urls = require('../config/paths.json');
const axios = require('axios');

module.exports = {

    async getTracklist(req, res){

        axios.get(urls.MUSICA.top_50)
        .then(response => {
            // handle success
            res.send(response.data.tracks.data);
        })
        .catch(error => {
            // handle error 
            res.status(400).send({
                error: 'Error obteniendo tracks',
            });
        })
    },
};
