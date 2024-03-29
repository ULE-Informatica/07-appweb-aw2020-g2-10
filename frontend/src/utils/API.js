import axios from "axios";
import store from "../store/index";

export default () =>
  axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  });
