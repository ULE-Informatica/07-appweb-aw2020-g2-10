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
        import(/* webpackChunkName: "track-view" */ './TrackView.vue'),
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () =>
        import(/* webpackChunkName: "perfil" */ './PerfilUsuario.vue'),
    },
    {
      path: "*",
      redirect: "/"
      // TODO: Add 404 page
    }
  ]
});
