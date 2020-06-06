<template>
  <div>
    <v-container v-if="isUserLoggedIn">
      <v-btn @click="goBack()" text dark rounded color="primary">
        <v-icon class="mr-2">mdi-arrow-left-circle</v-icon>ATRÁS
      </v-btn>
      <v-layout class="justify-center">
        <v-flex class="xs6 sm5 md4 mt-5">
          <img :src="image" alt class="image" />
        </v-flex>
        <v-flex class="xs6 sm5 md4 mt-5">
          <div>
            <div class="titulo">{{title}}</div>
            <div class="artistas text--primary">
              <v-icon class="icono_artistas" color="primary">mdi-account-music</v-icon>
              {{artistsName}}
            </div>
            <v-container class="pa-4 text-center">
              <v-row class="fill-height" align="center" justify="center">
                <template v-for="(item, i) in artistsImages">
                  <v-col :key="i" cols="12" md="4">
                    <img :src="item.imagen" class="image_artist" />
                  </v-col>
                </template>
              </v-row>
            </v-container>
            <div class="text-center">
              <v-btn v-if="!isFavorito()" text dark rounded color="pink">
                <v-icon class="mr-3">mdi-heart-outline</v-icon> LOVE IT
              </v-btn>
              <v-btn v-else text dark rounded color="pink">
                <v-icon class="mr-3">mdi-heart</v-icon> LOVED!
              </v-btn>
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
    preview: new Audio()
  }),
  components: {
    NoDisponible
  },
  computed: mapState(["isUserLoggedIn", "user"]),
  methods: {
    goBack: () => {
      router.go(-1);
    },
    isFavorito: function() {
        return FavoritoService.isFavorito(this.identifier, this.user.id)    
    }
  },
  mounted: function() {
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

        if (this.trackData.contributors.length != 1)
          this.artistsName = this.artistsName.substring(
            0,
            this.artistsName.length - 3
          );
        else
          this.artistsName = this.artistsName.substring(
            0,
            this.artistsName.length - 2
          );

        this.title = this.trackData.title;
        this.preview = this.trackData.preview;
      })
      .catch(error => {
        console.log(error);
      });
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
</style>
