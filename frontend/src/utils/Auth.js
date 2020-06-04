import Api from './API';

export default {
  register(credential) {
    return Api().post('register', { credential });
  },
  login(credential) {
    return Api().post('login', { credential });
  },
};
