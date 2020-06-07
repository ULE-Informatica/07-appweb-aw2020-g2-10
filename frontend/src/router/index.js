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
      path: "/track/:trackId",
      name: "track-view",
      component: () =>
        import(/* webpackChunkName: "track-view" */ "./TrackView.vue")
    },
    {
      path: "/perfil",
      name: "perfil",
      component: () =>
        import(/* webpackChunkName: "perfil" */ "./PerfilUsuario.vue")
    },
    {
      path: '/listafavoritos',
      name: 'lista-favoritos',
      component: () =>
        import(/* webpackChunkName: "lista-favoritos" */ './ListaFavoritos.vue'),
    },
    {
      path: "*",
      redirect: "/"
      // TODO: Añadir 404 page
    }
  ]
});
