import Api from "./API";

export default {
    isFavorito(trackId, userId){
        return Api().get("favorito", {
            params: {
                trackId: trackId,
                userId: userId
            }
        })
    },
    anadirFavorito(params){
        return Api().post('favorito', { params });
    },
    eliminarFavorito(params){
        return Api().delete('favorito', { params })
    }

};
