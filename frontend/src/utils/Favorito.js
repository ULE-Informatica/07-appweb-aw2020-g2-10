import API from "./API";

export default {
    isFavorito(trackId, userId){
        return API().get("favorito", {
            params: {
                trackId: trackId,
                userId: userId
            }
        })
    },
    anadirFavorito(params){
        return API().post('favorito', { params });
    },
    eliminarFavorito(params){
        return API().delete('favorito', { params })
    }

};
