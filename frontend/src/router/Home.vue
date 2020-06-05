<template>
  <div id="home">
    <v-parallax dark :src="require('@/assets/fondoPrincipal.jpg')" height="420">
      <v-layout align-center column justify-center>
        <h1 class="display-2 font-weight-medium mb-3">{{ text.title }}</h1>
        <h2 class="display-7 font-weight-thin mb-3">{{ text.subtitle }}</h2>
        <h4 class="subheading">{{ text.slogan }}</h4>
      </v-layout>
    </v-parallax>
    <Top50 v-if="isUserLoggedIn"/>
    <Bienvenida v-else/>
  </div>
</template>

<script>
import Top50 from "@/components/Top50.vue";
import Bienvenida from "@/components/Bienvenida.vue"
import { mapState } from "vuex";


export default {
  name: "Home",
  components: {
    Top50,
    Bienvenida
  },
  props: {
    source: String
  },
  computed: mapState(["isUserLoggedIn"]),
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
