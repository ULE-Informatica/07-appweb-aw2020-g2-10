<template>
  <v-app-bar color="primary" dark app flat fixed>
    <v-toolbar-items class="align-center">
      <v-img height="50" width="50" :src="require('../assets/logo_fondo_azul.png')"></v-img>
    </v-toolbar-items>
    <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
      <span class="mr-3 font-weight-bold">{{ text.titulo }}</span>
    </v-toolbar-title>
    <v-spacer />
    <v-toolbar-items v-if="isUserLoggedIn" class="align-center">
      <v-btn text icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn text icon>
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
      <v-btn text icon class="font-weight-bold red--text">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-else class="align-center">
      <auth-pop-up />
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import AuthPopUp from "@/components/AuthWindow/AuthPopUp.vue";

export default {
  name: "BarraNavegacion",
  components: {
    AuthPopUp
  },
  computed: mapState(["isUserLoggedIn"]),
  data: () => ({
    text: {
      texto_boton: "LOG OUT",
      titulo: "The Content Box 📦"
    }
  })
};
</script>
