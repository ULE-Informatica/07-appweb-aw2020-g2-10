import Api from "./API";

export default {
  actualizar(profile) {
    return Api().put("perfil", profile);
  },
  getUser(userId) {
    return Api().get(`perfil/${userId}`)
  }
};
