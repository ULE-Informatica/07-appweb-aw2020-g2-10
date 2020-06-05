<template>
  <v-layout align-center>
    <v-dialog v-model="dialog" max-width="460px">
      <template v-slot:activator="{ on }">
        <v-btn
          color="white"
          class="mr-0 blue--text font-weight-bold"
          v-on="on"
          dark
        >
          {{ text.texto_boton }}
        </v-btn>
      </template>
      <v-tabs color="cyan" slider-color="yellow" right>
        <v-tab ripple>Login</v-tab>
        <v-tab ripple>Sign Up</v-tab>
        <v-tab-item>
          <LoginDialog @done="dialog = false" />
        </v-tab-item>
        <v-tab-item>
          <RegistroDialog @done="dialog = false" />
        </v-tab-item>
      </v-tabs>
    </v-dialog>
  </v-layout>
</template>

<script>
import LoginDialog from "./LoginDialog";
import RegistroDialog from "./RegistroDialogo";

export default {
  name: "AuthPopUp",
  components: {
    LoginDialog,
    RegistroDialog
  },
  data: () => ({
    dialog: false,
    text: {
      texto_boton: "LOG IN / SIGN UP",
      login: "Login",
      signup: "Sign Up"
    }
  })
};
</script>
