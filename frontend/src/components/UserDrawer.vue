<template>
  <v-img :aspect-ratio="16 / 9" src="../assets/fondoDrawer.png">
    <v-list>
      <v-list-item>
        <v-hover v-slot:default="{ hover }">
          <v-btn icon fab @click="abrirDialog">
            <v-avatar large>
              <v-img
                :src="
                  require('../assets/avatar/' + avatarSelectedName + '.png')
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
                                            font-size: 0.65em;
                                            "
                >
                  {{ txt.change }}
                </div>
              </v-expand-transition>
            </v-avatar>
          </v-btn>
        </v-hover>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">{{ nombre }}</v-list-item-title>
          <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-dialog v-model="selectAvatarDialog" scrollable max-width="500px">
      <v-card max-height="300px">
        <v-card-title>
          {{ txt.seleccion_avatar }}
        </v-card-title>
        <v-card-text>
          <v-hover
            v-for="item in avatares"
            :key="item"
            v-slot:default="{ hover }"
          >
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
                <v-img
                  :src="require('../assets/avatar/' + item + '.png')"
                ></v-img>
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
                  >
                    {{ txt.select }}
                  </div>
                  <div
                    v-if="selected == item || avatarSelectedName == slected"
                    class="d-flex transition-fast-in-fast-out green darken-2 v-card--reveal bold white--text"
                    style="height: 100%; 
                                                align-items: center;
                                                bottom: 0;
                                                justify-content: center;
                                                opacity: .8;
                                                position: absolute;
                                                width: 100%;
                                                font-size: 0.5em;
                                                "
                  >
                    {{ txt.selected }}
                  </div>
                </v-expand-transition>
              </v-avatar>
            </v-btn>
          </v-hover>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" text @click="guardar">
            {{ txt.close }}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="cancelar">
            {{ txt.save }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-img>
</template>

<script>
export default {
  name: "UserDrawer",
  props: {
    nombre: String,
    email: String
  },
  data: () => ({
    avatares: [
      "001",
      "003",
      "012",
      "013",
      "017",
      "018",
      "021",
      "028",
      "030",
      "031",
      "035",
      "036",
      "038",
      "039",
      "043",
      "044",
      "045",
      "046",
      "047",
      "055",
      "058",
      "059",
      "060",
      "062",
      "063",
      "064",
      "065",
      "066",
      "068",
      "069",
      "070",
      "072",
      "073",
      "075",
      "079"
    ],
    avatarSelectedName: "001",
    selectAvatarDialog: false,
    txt: {
      close: "CLOSE",
      seleccion_avatar: "Seleccione un avatar...",
      select: "SELECT",
      change: "CHANGE",
      selected: "SELECTED",
      save: "SAVE"
    },
    selected: null
  }),
  methods: {
    cancelar: function() {
      this.selectAvatarDialog = false;
      this.avatarSelectedName = this.selected;
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

<style scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
