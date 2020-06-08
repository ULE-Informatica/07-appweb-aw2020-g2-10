<template>
  <div>
    <v-card class="text-lg-center pt-5">
      <v-hover v-slot:default="{ hover }">
        <v-btn outlined color="primary" icon fab @click="abrirDialog" width="150" height="150">
          <v-avatar size="140">
            <v-img :src="require('../../assets/avatar/' + selected + '.png')"></v-img>
            <v-expand-transition>
              <div
                v-if="hover"
                class="d-flex transition-fast-in-fast-out blue darken-2 v-card--reveal bold white--text"
                style="height: 100%; 
                                            align-items: center;
                                            bottom: 0;
                                            justify-content: center;
                                            opacity: .8;
                                            position: absolute;
                                            width: 100%;
                                            font-size: 1.4em;
                                            "
              >{{ txt.change }}</div>
            </v-expand-transition>
          </v-avatar>
        </v-btn>
      </v-hover>

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
    <v-dialog v-model="selectAvatarDialog" scrollable max-width="500px">
      <v-card max-height="300px">
        <v-card-title>{{ txt.seleccion_avatar }}</v-card-title>
        <v-card-text>
          <v-hover v-for="item in avatares" :key="item" v-slot:default="{ hover }">
            <v-btn
              v-if="item"
              :key="item"
              align="center"
              icon
              fab
              style="margin-right: 2px; margin-left: 2px;"
              rounded
              @click="asignar(item)"
            >
              <v-avatar large>
                <v-img :src="require('../../assets/avatar/' + item + '.png')"></v-img>
                <v-expand-transition>
                  <div
                    v-if="selected != item && hover"
                    class="d-flex transition-fast-in-fast-out grey darken-2 v-card--reveal bold white--text"
                    style="height: 100%; 
                                                align-items: center;
                                                bottom: 0;
                                                justify-content: center;
                                                opacity: .8;
                                                position: absolute;
                                                width: 100%;
                                                font-size: 0.65em;
                                                "
                  >{{ txt.select }}</div>
                  <div
                    v-if="selected == item"
                    class="d-flex transition-fast-in-fast-out green darken-2 v-card--reveal bold white--text avatar_icon"
                    style="font-size: 0.5em; "
                  >{{ txt.selected }}</div>
                </v-expand-transition>
              </v-avatar>
            </v-btn>
          </v-hover>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" text @click="guardar">{{ txt.close }}</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="cancelar">{{ txt.save }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AuthService from "@/utils/Auth";
import AvatarService from "@/utils/Avatar.js";

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
      avatares: [],
      selectAvatarDialog: false,
      txt: {
        close: "CLOSE",
        seleccion_avatar: "Seleccione un avatar...",
        select: "SELECT",
        change: "CHANGE",
        selected: "SELECTED",
        save: "SAVE"
      },
      selected: "001",
      dialog: false,
      error: null,
      valid: false
    };
  },
  mounted() {
    this.valid = false;
    this.avatares = AvatarService.getAvatars();
    this.selected = this.user.avatar;
  },
  methods: {
    async register() {
      try {
        const response = await AuthService.register({
          name: this.name,
          email: this.email,
          username: this.username,
          password: this.password,
          avatar: this.selected,
        });
        store.dispatch("setToken", response.data.token);
        store.dispatch("setUser", response.data.user);
        this.$emit("done");
        this.$refs.form.reset();
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    cancelar: function() {
      this.selectAvatarDialog = false;
    },
    guardar: function() {
      this.selectAvatarDialog = false;
      this.selected = this.avatarSelectedName;
    },
    asignar: function(item) {
      this.selected = item;
    },
    abrirDialog: function() {
      this.selectAvatarDialog = true;
      this.selected = this.avatarSelectedName;
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

.avatar_icon {
  height: 100%;
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}
</style>
