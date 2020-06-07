import Api from "./API";

export default {
    getTracks() {
        return Api().get("tracks");
    },
    getTrackInfo(trackId){
        return Api().get(`tracks/${trackId}`);
    }
};
