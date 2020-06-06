import Vue from "vue";
import VueRouter from "vue-router";
import Home from "./Home.vue";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: '/track/:trackId',
      name: 'track-view',
      component: () =>
        import(/* webpackChunkName: "single-album" */ './TrackView.vue'),
    },
    {
      path: "*",
      redirect: "/"
      // TODO: Add 404 page
    }
  ]
});
