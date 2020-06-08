<template>
  <div>
    <v-container v-if="isUserLoggedIn">
      <v-btn @click="goBack()" text dark rounded color="primary">
        <v-icon class="mr-2">mdi-arrow-left-circle</v-icon>ATRÁS
      </v-btn>
      <v-layout class="justify-center">
        <v-flex class="xs6 sm5 md4 mt-5">
          <v-img :src="image" alt class="image">
            <v-btn
              v-if="playing"
              class="boton mx-2"
              fab
              dark
              width="100"
              height="100"
              @click.prevent="pause()"
            >
              <v-icon style="font-size: 80px">> mdi-pause-circle-outline</v-icon>
            </v-btn>
            <v-btn
              v-if="!playing"
              class="boton mx-2"
              fab
              dark
              width="100"
              height="100"
              @click.prevent="play(preview)"
            >
              <v-icon style="font-size: 80px">> mdi-play-circle-outline</v-icon>
            </v-btn>
          </v-img>
        </v-flex>
        <v-flex class="xs6 sm5 md4 mt-5">
          <div>
            <div class="titulo">{{ title }}</div>
            <div class="artistas text--primary">
              <v-icon class="icono_artistas" color="primary">mdi-account-music</v-icon>
              {{ artistsName }}
            </div>
            <v-container class="pa-4 text-center">
              <v-row class="fill-height" align="center" justify="center">
                <template v-for="(item, i) in artistsImages">
                  <v-col :key="i" cols="12" md="4">
                    <v-img :src="item.imagen" class="image_artist" />
                  </v-col>
                </template>
              </v-row>
            </v-container>
            <div class="text-center">
              <v-dialog v-if="favorito" v-model="dialog" width="500">
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" text dark rounded color="pink">
                    <v-icon class="mr-3">mdi-heart</v-icon>LOVED
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="headline">
                    El producto será eliminaddo de su lista de favoritos,
                    ¿desea continuar?
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">CANCELAR</v-btn>
                    <v-btn color="red darken-1 white--text" @click="eliminarFavorito()">
                      ELIMINAR
                      <v-icon class="ml-1">mdi-delete-circle-outline</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog v-else v-model="dialog" width="500">
                <template v-slot:activator="{ on }">
                  <v-btn v-on="on" text dark rounded color="pink">
                    <v-icon class="mr-3">mdi-heart-outline</v-icon>LOVE IT!
                  </v-btn>
                </template>
                <v-card class="text-center">
                  <v-card-title class="headline grey lighten-2" primary-title>Añadir a favoritos...</v-card-title>
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
                    label="Añade algún comentario..."
                    class="pa-3"
                  ></v-textarea>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">CANCELAR</v-btn>
                    <v-btn
                      color="pink lighten-1 white--text"
                      class="ml-3"
                      @click="anadirFavorito()"
                    >
                      LOVE IT!
                      <v-icon class="ml-2">mdi-heart</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <template>
        <v-cointainer fluid class="mt-10 mb-12">
          <v-row justify="center" class="mt-10 mb-12">
            <v-subheader>Comentarios de usuarios</v-subheader>
            <v-expansion-panels popout class="mb-12">
              <v-expansion-panel v-for="(comentarios, i) in comentarios" :key="i" hide-actions>
                <v-expansion-panel-header>
                  <v-row align="center" class="spacer" no-gutters>
                    <v-col cols="4" sm="2" md="1">
                      <v-avatar size="36px">
                        <v-img :src="require('../assets/avatar/' + comentarios.avatar + '.png')"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col class="hidden-xs-only" sm="5" md="3">
                      <strong v-html="comentarios.username"></strong>
                    </v-col>
                    <v-col class="text-no-wrap" cols="5" sm="3">
                      <v-rating
                        color="yellow darken-3"
                        background-color="orange lighten-3"
                        empty-icon="mdi-star-outline"
                        half-increments
                        v-model="comentarios.puntuacion"
                        readonly
                      ></v-rating>
                    </v-col>
                    <v-col class="grey--text text-truncate hidden-sm-and-down">
                      &mdash;
                      {{ comentarios.comentario }}
                    </v-col>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-divider></v-divider>
                  <v-card-text v-text="comentarios.comentario"></v-card-text>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-row>
        </v-cointainer>
      </template>
    </v-container>
    <NoDisponible v-if="!isUserLoggedIn" />
  </div>
</template>

<script>
import router from "@/router/index";
import { mapState } from "vuex";

import TrackService from "@/utils/Track";
import FavoritoService from "@/utils/Favorito";
import UserService from "@/utils/User";

import NoDisponible from "@/components/NoDisponible.vue";

export default {
  data: () => ({
    tracksData: [],
    identifier: "",
    image: "",
    artistsName: [],
    artistsImages: [],
    title: "",
    favorito: "",
    preview: new Audio(),
    dialog: false,
    puntuacion: 0,
    comentario: "",
    playing: false,
    comentarios: []
  }),
  components: {
    NoDisponible
  },
  computed: mapState(["isUserLoggedIn", "user"]),
  methods: {
    actualizar: function() {
      if (this.isUserLoggedIn) {
        const { trackId } = this.$route.params;
        TrackService.getTrackInfo(trackId)
          .then(response => {
            this.trackData = response.data;

            this.image = this.trackData.album.cover_xl;
            this.identifier = this.trackData.id;

            this.artistsName = [];
            this.artistsImages = [];

            this.trackData.contributors.forEach(item => {
              this.artistsName = this.artistsName + item.name + ", ";
              this.artistsImages.push({
                imagen: item.picture_xl,
                nombre: item.name
              });
            });

            this.artistsName = this.artistsName.substring(
              0,
              this.artistsName.length - 2
            );

            this.title = this.trackData.title;
            this.preview = this.trackData.preview;

            FavoritoService.isFavorito(this.identifier, this.user.id)
              .then(response => {
                this.favorito = response.data;
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(error => {
            console.log(error);
          });

        // Obtenemos los comentarios
        this.comentarios = [];

        FavoritoService.getAllComentarios(trackId)
          .then(response => {
            const listaFavoritos = response.data;

            listaFavoritos.forEach(item => {
              UserService.getUser(item.UserId)
                .then(res => {
                  this.comentarios.push({
                    username: res.data.username,
                    avatar: res.data.avatar,
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
    goBack: () => {
      router.go(-1);
    },
    anadirFavorito: async function() {
      await FavoritoService.anadirFavorito({
        trackId: this.identifier,
        userId: this.user.id,
        comentario: this.comentario,
        puntuacion: this.puntuacion
      });

      FavoritoService.isFavorito(this.identifier, this.user.id)
        .then(response => {
          this.favorito = response.data;
        })
        .catch(err => {
          console.log(err);
        });

      this.dialog = false;
      this.actualizar();
    },
    eliminarFavorito: async function() {
      await FavoritoService.eliminarFavorito({
        trackId: this.identifier,
        userId: this.user.id
      });
      this.dialog = false;
      this.comentario = "";
      this.puntuacion = 0;

      FavoritoService.isFavorito(this.identifier, this.user.id)
        .then(response => {
          this.favorito = response.data;
        })
        .catch(err => {
          console.log(err);
        });

        this.actualizar();
    },
    play(audio) {
      this.playing = true;
      this.currentAudio = new Audio(audio);
      this.currentAudio.play();
    },
    pause() {
      this.playing = false;
      this.currentAudio.pause();
      this.currentAudio = new Audio();
    }
  },
  mounted: function() {
    if (this.isUserLoggedIn) {
      const { trackId } = this.$route.params;
      TrackService.getTrackInfo(trackId)
        .then(response => {
          this.trackData = response.data;

          this.image = this.trackData.album.cover_xl;
          this.identifier = this.trackData.id;

          this.trackData.contributors.forEach(item => {
            this.artistsName = this.artistsName + item.name + ", ";
            this.artistsImages.push({
              imagen: item.picture_xl,
              nombre: item.name
            });
          });

          this.artistsName = this.artistsName.substring(
            0,
            this.artistsName.length - 2
          );

          this.title = this.trackData.title;
          this.preview = this.trackData.preview;

          FavoritoService.isFavorito(this.identifier, this.user.id)
            .then(response => {
              this.favorito = response.data;
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(error => {
          console.log(error);
        });

      // Obtenemos los comentarios
      FavoritoService.getAllComentarios(trackId)
        .then(response => {
          const listaFavoritos = response.data;

          listaFavoritos.forEach(item => {
            UserService.getUser(item.UserId)
              .then(res => {
                this.comentarios.push({
                  username: res.data.username,
                  avatar: res.data.avatar,
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

<style lang="scss" scoped>
.image {
  width: 95%;
  margin: 0 auto;
}

.image_artist {
  width: 100%;
  margin: 0 auto;
}

.titulo {
  font-size: 30px;
}

.artistas {
  font-size: 24px;
}

.icono_artistas {
  font-size: 27px;
  margin-bottom: 4px;
}

.column {
  flex: 33.33%;
  padding: 5px;
}

.row::after {
  display: flex;
}

.boton {
  position: absolute;
  top: 50%;
  left: 46%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  border: none;
}
</style>
