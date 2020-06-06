import Api from "./API";

export default {
    getTracks() {
        return Api().get("tracks");
    }
};
