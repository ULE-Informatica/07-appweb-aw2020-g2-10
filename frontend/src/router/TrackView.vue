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
              :class="{ 'show-btns': hover }"
              class="boton mx-2"
              fab
              dark
              width=100
              height=100
              @click.prevent="pause()"
            >
              <v-icon :class="{ 'show-btns': hover }" style="font-size: 80px">> mdi-pause-circle-outline</v-icon>
            </v-btn>
            <v-btn
              v-if="!playing"
              :class="{ 'show-btns': hover }"
              class="boton mx-2"
              fab
              dark
              width=100
              height=100
              @click.prevent="play(preview)"
            >
              <v-icon :class="{ 'show-btns': hover }" style="font-size: 80px">> mdi-play-circle-outline</v-icon>
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
                    <v-btn color="red darken-1" text @click="eliminarFavorito()">
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
                    color="deep-purple"
                    label="Añade algún comentario..."
                    class="pa-3"
                  ></v-textarea>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="dialog = false">CANCELAR</v-btn>
                    <v-btn color="pink lighten-1" class="ml-3" @click="anadirFavorito()">
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
    </v-container>
    <NoDisponible v-else />
  </div>
</template>

<script>
import router from "@/router/index";
import { mapState } from "vuex";

import TrackService from "@/utils/Track";
import FavoritoService from "@/utils/Favorito";

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
    playing: false
  }),
  components: {
    NoDisponible
  },
  computed: mapState(["isUserLoggedIn", "user"]),
  methods: {
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
    },
    eliminarFavorito: async function() {
      await FavoritoService.eliminarFavorito({
        trackId: this.identifier,
        userId: this.user.id
      });
      this.dialog = false;

      FavoritoService.isFavorito(this.identifier, this.user.id)
        .then(response => {
          this.favorito = response.data;
        })
        .catch(err => {
          console.log(err);
        });
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
