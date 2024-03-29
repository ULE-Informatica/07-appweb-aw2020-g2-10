<template>
  <v-container fluid grid-list-md>
    <v-layout justify-center>
      <v-flex xs10>
        <h2 class="ml-4 pb-3">Hits del momento en España! 🇪🇸</h2>
        <v-row class="flex-start row mb-12">
          <v-col class="col-3" v-for="(item, i) in tracks" :key="i">
            <v-hover v-slot:default="{ hover }">
              <v-card
                :elevation="hover ? 12 : 2"
                :class="{ 'on-hover': hover }"
                slot="item"
                max-width="280px"
                class="ml-2 mr-2 mb-2"
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
                      <v-icon :class="{ 'show-btns': hover }">> mdi-pause-circle-outline</v-icon>
                    </v-btn>
                    <v-btn
                      v-if="!playing"
                      :class="{ 'show-btns': hover }"
                      class="boton mx-2"
                      fab
                      dark
                      @click.prevent="play(item.preview)"
                    >
                      <v-icon :class="{ 'show-btns': hover }">> mdi-play-circle-outline</v-icon>
                    </v-btn>
                  </v-img>
                </div>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-subtitle class="subtitle-2 mb-2">
                      {{
                      item.artist.name
                      }}
                    </v-list-item-subtitle>
                    <v-list-item-title class="headline mb-1">
                      {{
                      item.title
                      }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="overline mb-2">
                      NÚMERO
                      {{
                      i+1
                      }}
                    </v-list-item-subtitle>
                    <v-btn
                      text
                      dark
                      rounded
                      color="primary"
                      :to="{
                        name: 'track-view',
                        params: {
                          trackId: item.id
                        }
                      }"
                    >
                      Ver más
                      <v-icon class="ml-1">mdi-information-outline</v-icon>
                    </v-btn>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        <div slot="no-data">
          <v-progress-circular indeterminate color="pink"></v-progress-circular>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TrackService from "@/utils/Track";

export default {
  name: "Top50",
  data: () => ({
    tracks: [],
    playing: false,
    currentAudio: new Audio()
  }),
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
  },
  mounted: function() {
    TrackService.getTracks()
      .then(response => {
        this.tracks = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
  beforeDestroy: function() {
    this.currentAudio.pause();
    this.currentAudio = new Audio();
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
