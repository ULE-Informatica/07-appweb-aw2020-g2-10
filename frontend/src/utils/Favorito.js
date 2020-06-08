import Api from "./API";

export default {
  isFavorito(trackId, userId) {
    return Api().get("favorito", {
      params: {
        trackId: trackId,
        userId: userId
      }
    });
  },
  anadirFavorito(params) {
    return Api().post("favorito", { params });
  },
  eliminarFavorito(params) {
    return Api().delete("favorito", { params });
  },
  getListaFavoritosUser(params) {
    return Api().get("listafavoritos", { params })
  },
  editarFavorito(params) {
    return Api().post("editarfavorito", { params })
  },
  getAllComentarios(trackId) {
    return Api().get(`favorito/${trackId}`)
  }
};
