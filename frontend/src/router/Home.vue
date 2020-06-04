<template>
  <div id="home">
      <v-parallax dark :src="require('@/assets/fondoPrincipal.jpg')" height="420">
        <v-layout align-center column justify-center>
          <h1 class="display-2 font-weight-medium mb-3">{{ text.title }}</h1>
          <h2 class="display-7 font-weight-thin mb-3">{{ text.subtitle }}</h2>
          <h4 class="subheading">{{ text.slogan }}</h4>
        </v-layout>
      </v-parallax>
      <ListaEjemplos />
  </div>
</template>

<script>
import ListaEjemplos from "@/components/ListaEjemplos.vue";


export default {
  name: "Home",
  components: {
    ListaEjemplos
  },
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
    usuarioLogeado: false,
    text: {
      title: "The Content Box",
      subtitle: "films · music · podcast",
      slogan: "Own your content!"
    }
  }),
  methods: {
    ocultarDrawer: function() {
      this.drawer = !this.drawer;
    }
  }
};
</script>
