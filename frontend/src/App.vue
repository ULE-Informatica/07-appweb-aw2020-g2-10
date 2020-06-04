<template>
  <v-app>
    <BarraNavegacion />
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import BarraNavegacion from "@/components/BarraNavegacion";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    BarraNavegacion,
    Footer
  }
};
</script>
