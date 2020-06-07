<template>
  <div id="perfilUsuario">
    <v-btn @click="goBack()" class="mt-4 ml-12" text dark rounded color="primary">
      <v-icon class="mr-2">mdi-arrow-left-circle</v-icon>ATRÁS
    </v-btn>
    <v-container v-if="isUserLoggedIn" class="m4 text-center">
      <v-data-table :headers="headers" :items="listaFavoritos" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title class="pink--text">
              LISTA DE FAVORITOS
              <v-icon class="pink--text mb-1">mdi-heart</v-icon>
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-circle-edit-outline</v-icon>
          <v-icon small color="red" @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="actualizar">Reset</v-btn>
        </template>
      </v-data-table>
      <v-dialog v-model="dialogEdit" max-width="500px">
        <v-card>
          <v-card-text class="pt-6">
            <p class="display-1 text--primary">{{itemSelected.titulo}}</p>
            <div>{{itemSelected.artista}}</div>
            <v-rating
              v-model="puntuacion"
              color="yellow darken-3"
              background-color="yellow darken-1"
              empty-icon="mdi-star-outline"
              half-increments
              hover
              size="60"
            ></v-rating>
            <v-textarea
              v-model="comentario"
              auto-grow
              filled
              color="pink"
              label="Edita el comentario..."
              class="pa-3"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialogEdit = false">Cancelar</v-btn>
            <v-btn color="primary" @click="guardar()">
              GUARDAR
              <v-icon class="ml-2">mdi-content-save</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="560">
        <v-card>
          <v-card-title
            class="headline"
          >El producto será retirado de la lista de favoritos, ¿desea continuar?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialogDelete = false">Cancelar</v-btn>
            <v-btn color="red" class="white--text" @click="eliminar()">
              Eliminar
              <v-icon class="white--text mb-1">mdi-delete-forever-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
    <NoDisponible v-else />
  </div>
</template>

<script>
import NoDisponible from "@/components/NoDisponible.vue";

import router from "@/router/index";
import { mapState } from "vuex";

import FavoritoService from "@/utils/Favorito";
import TrackService from "@/utils/Track";

export default {
  name: "PerfilUsuario",
  components: {
    NoDisponible
  },
  data: () => ({
    headers: [
      {
        text: "Título",
        value: "titulo"
      },
      {
        text: "Artista",
        value: "artista"
      },
      {
        text: "Comentario",
        value: "comentario"
      },
      {
        text: "Puntuacion",
        value: "puntuacion"
      },
      { text: "Acciones", value: "actions", sortable: false }
    ],
    pagination: {
      sortBy: "createdAt",
      descending: true
    },
    listaFavoritos: [],
    itemSelected: "",
    dialogEdit: false,
    dialogDelete: false,
    puntuacion: "",
    comentario: ""
  }),
  methods: {
    goBack: () => {
      router.go(-1);
    },
    editItem: function(item) {
      this.itemSelected = item;
      this.puntuacion = parseInt(this.itemSelected.puntuacion, 10);
      this.comentario = this.itemSelected.comentario;
      this.dialogEdit = true;
    },
    deleteItem: function(item) {
      this.itemSelected = item;
      this.puntuacion = parseInt(this.itemSelected.puntuacion, 10);
      this.comentario = this.itemSelected.comentario;
      this.dialogDelete = true;
    },
    actualizar: function() {
      if (this.isUserLoggedIn) {
        FavoritoService.getListaFavoritosUser(this.user)
          .then(response => {
            response.data.forEach(item => {
              TrackService.getTrackInfo(item.producto)
                .then(res => {
                  this.listaFavoritos.push({
                    id: item.producto,
                    titulo: res.data.title,
                    artista: res.data.contributors[0].name,
                    comentario: item.comentario,
                    puntuacion: item.puntuacion
                  });
                })
                .catch(error => {
                  console.log(error);
                });
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    guardar: function() {
      this.itemSelected.puntuacion = this.puntuacion;
      this.itemSelected.comentario = this.comentario;

      const favorito = {
        producto: this.itemSelected.id,
        comentario: this.itemSelected.comentario,
        puntuacion: this.itemSelected.puntuacion,
        userId: this.user.id
      };

      FavoritoService.editarFavorito(favorito);

      this.dialogEdit = false;
    },
    eliminar: async function() {
      this.itemSelected.puntuacion = this.puntuacion;
      this.itemSelected.comentario = this.comentario;

      const favorito = {
        trackId: this.itemSelected.id,
        userId: this.user.id
      };

      await FavoritoService.eliminarFavorito(favorito);

      this.listaFavoritos = [];
      this.actualizar();

      this.dialogDelete = false;
    }
  },
  computed: mapState(["isUserLoggedIn", "user"]),
  mounted: function() {
    if (this.isUserLoggedIn) {
      FavoritoService.getListaFavoritosUser(this.user)
        .then(response => {
          response.data.forEach(item => {
            TrackService.getTrackInfo(item.producto)
              .then(res => {
                this.listaFavoritos.push({
                  id: item.producto,
                  titulo: res.data.title,
                  artista: res.data.contributors[0].name,
                  comentario: item.comentario,
                  puntuacion: item.puntuacion
                });
              })
              .catch(error => {
                console.log(error);
              });
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
</style>
