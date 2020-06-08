<template>
  <v-card>
    <v-img height="120px" src="../../assets/registro.jpg">
      <v-container class="fill-height fluid">
        <v-layout>
          <v-flex class="xs12 align-end d-flex">
            <div class="caja">REGISTRO</div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>

    <v-card-text>
      <div class="error" v-html="error" />
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          prepend-icon="mdi-account"
          type="text"
          label="Nombre"
          :rules="nameRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="username"
          prepend-icon="mdi-account-circle"
          type="email"
          label="Nombre de usuario"
          :rules="usernameRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          prepend-icon="mdi-email"
          type="email"
          label="Email"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          prepend-icon="mdi-lock"
          type="password"
          label="Password"
          :rules="passwordRules"
          required
        ></v-text-field>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" :disabled="!valid" @click="register">Registrarse</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import AuthService from "@/utils/Auth";
import store from "@/store/index";

export default {
  data() {
    return {
      name: "",
      nameRules: [v => !!v || "Nombre es un campo obligatorio"],
      email: "",
      emailRules: [
        v => !!v || "E-mail es un campo obligatorio",
        v => /.+@.+/.test(v) || "E-mail es un  campo obligatorio"
      ],
      username: "",
      usernameRules: [v => !!v || "Nombre de usuario es un campo obligatorio"],
      password: "",
      passwordRules: [
        v => !!v || "Contraseña es un campo boligatorio",
        v => (v && v.length >= 6) || "Contraseña es un campo boligatorio"
      ],
      error: null,
      valid: false
    };
  },
  mounted() {
    this.valid = false;
  },
  methods: {
    async register() {
      try {
        const response = await AuthService.register({
          name: this.name,
          email: this.email,
          username: this.username,
          password: this.password,
          avatar: "001"
        });
        store.dispatch("setToken", response.data.token);
        store.dispatch("setUser", response.data.user);
        this.$emit("done");
        this.$refs.form.reset();
      } catch (error) {
        this.error = error.response.data.error;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.link {
  font-size: 1.1em;
  padding-left: 15px;
  text-decoration: none;
}
.error {
  color: white;
  border-radius: 4px;
  padding-left: 4px;
}
.caja {
  font-family: sans-serif;
  font-size: 18px;
  font-weight: 400;
  color: #ffffff;
  background: #ee0467;
  padding: 4px;
  border-radius: 5px;
  border-color: black;
  border: 2px solid #0000;
}
</style>
