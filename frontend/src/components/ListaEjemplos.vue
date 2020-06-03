<template>
  <v-container fluid grid-list-md>
    <v-layout justify-center>
      <v-flex xs10>
        <h2 class="ml-4 pb-3">Top 50 de España! 🇪🇸</h2>
        <v-row class="flex-start row">
          <v-col class="col-3" v-for="(item, i) in tracks" :key="i">
            <v-hover v-slot:default="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
                slot="item"
                max-width="280px"
                class="mx-auto"
              >
                <div class="align-self-center" style="position: relative;">
                  <v-img :src="item.album.cover_xl" height="260px">
                    <v-btn
                      v-if="playing"
                      :class="{ 'show-btns': hover }"
                      class="boton mx-2"
                      fab
                      dark
                      @click.prevent="pause()"
                    >
                      <v-icon :class="{ 'show-btns': hover }">
                        > mdi-pause-circle-outline
                      </v-icon>
                    </v-btn>
                    <v-btn
                      v-if="!playing"
                      :class="{ 'show-btns': hover }"
                      class="boton mx-2"
                      fab
                      dark
                      @click.prevent="play(item.preview)"
                    >
                      <v-icon :class="{ 'show-btns': hover }">
                        > mdi-play-circle-outline
                      </v-icon>
                    </v-btn>
                  </v-img>
                </div>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-subtitle class="overline mb-4">{{
                      item.artist.name
                    }}</v-list-item-subtitle>
                    <v-list-item-title class="headline mb-1">{{
                      item.title
                    }}</v-list-item-title>
                    <span class="pink--text font-weight-bold font-smaller"
                      >Ya disponible!</span
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        <div slot="no-data">
          <v-progress-circular indeterminate color="pink">
          </v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Api from '../utils/API';

export default {
  name: "ListaEjemplos",
  data: () => ({
    tracks: [],
    playing: false,
    currentAudio: new Audio()
  }),
  mounted: function() {
    console.log("Se ha ejecutado mounted!");

    Api()
      .get("http://localhost:3000/tracks")
      .then(response => {
        // handle success
        this.tracks = response.data;
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  },
  methods: {
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
  }
};
</script>

<style scoped>
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.6;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
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
