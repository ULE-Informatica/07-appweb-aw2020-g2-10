<template>
  <div id="perfilUsuario">
    <v-btn @click="goBack()" class="mt-4 ml-12" text dark rounded color="primary">
      <v-icon class="mr-2">mdi-arrow-left-circle</v-icon>ATRÁS
    </v-btn>
    <v-container v-if="isUserLoggedIn" class="m4 text-center">
      <v-hover v-slot:default="{ hover }">
        <v-btn outlined color="primary" icon fab @click="abrirDialog" width="150" height="150">
          <v-avatar size="140">
            <v-img
              :src="
                  require('../assets/avatar/' + selected + '.png')
                "
            ></v-img>
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

      <v-layout class="justify-center mt-lg-4 mb-4">
        <v-flex class="xs12 sm10 md8 lg6">
          <div class="mt-7">
            <v-text-field label="Nombre" v-model="usuario.name" prepend-icon="mdi-face" required></v-text-field>
            <v-text-field label="Email" v-model="usuario.email" prepend-icon="mdi-email" required></v-text-field>
            <v-btn class="float-right" @click="actualizarUsuario()" color="primary">Actualizar</v-btn>
          </div>
        </v-flex>
        <v-dialog v-model="dialog" max-width="500" class="text-center">
          <v-card class="text-center">
            <v-card-title>La información ha sido actualizada con éxito</v-card-title>
            <v-icon color="green darken-1" size="80px">mdi-check-circle-outline</v-icon>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">ACEPTAR</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
                    <v-img :src="require('../assets/avatar/' + item + '.png')"></v-img>
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
      </v-layout>
    </v-container>
    <NoDisponible v-else />
  </div>
</template>

<script>
import NoDisponible from "@/components/NoDisponible.vue";

import AvatarService from "@/utils/Avatar.js";
import UserService from "@/utils/User.js";

import { mapState } from "vuex";
import router from "@/router/index";
import store from "@/store/index";

export default {
  name: "PerfilUsuario",
  components: {
    NoDisponible
  },
  props: {
    source: String
  },
  computed: mapState(["isUserLoggedIn", "user"]),
  data: () => ({
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
    usuario: {
      id: null,
      name: null,
      email: null,
      avatar: null
    }
  }),
  methods: {
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
    },
    actualizarUsuario: function() {
      // Asignamos el avatar que está seleccionado
      this.usuario.avatar = this.selected;
      try {
        // Modificamos los valores del usuario
        UserService.actualizar(this.usuario);
        store.dispatch("updateUser", this.usuario);
      } catch (err) {
        console.log(err);
      }
      this.dialog = true;
    },
    goBack: () => {
      router.go(-1);
    }
  },
  mounted: function() {
    this.avatares = AvatarService.getAvatars();
    this.selected = this.user.avatar;
    this.usuario.name = this.user.name;
    this.usuario.email = this.user.email;
    this.usuario.id = this.user.id;
  }
};
</script>

<style scoped>
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