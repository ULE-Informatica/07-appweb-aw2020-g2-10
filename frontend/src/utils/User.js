import Api from "./API";

export default {
  actualizar(profile) {
    return Api().put("perfil", profile);
  }
};
