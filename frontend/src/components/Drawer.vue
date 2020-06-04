<template>
  <v-navigation-drawer
    v-model="visible"
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
  >
    <UserDrawer
      nombre="Jorge García Mateos"
      email="jgarcm16@estudiantes.unileon.es"
    />
    <v-divider></v-divider>
    <v-list>
      <template v-for="item in publicItems">
        <v-list-item :key="item.text" link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <template v-for="item in userItems">
        <v-list-group
          v-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.icon"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(child, i) in item.children" :key="i" link>
            <v-list-item-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ child.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </template>
      <v-divider></v-divider>
      <template v-for="item in configItems">
        <v-list-item :key="item.text" link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-divider></v-divider>
      <template v-for="item in logoutItems">
        <v-list-item :key="item.text" link>
          <v-list-item-action>
            <v-icon color="red">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content style="color:red;">
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import UserDrawer from "@/components/UserDrawer.vue";

export default {
  name: "Drawer",
  props: {
    visible: Boolean
  },
  components: {
    UserDrawer
  },
  data: () => ({
    dialog: false,
    publicItems: [
      {
        icon: "mdi-music-circle-outline",
        text: "Music"
      },
      {
        icon: "mdi-movie-open-outline",
        text: "Films"
      },
      {
        icon: "mdi-apple",
        text: "iOS Apps"
      },
      {
        icon: "mdi-bookshelf",
        text: "Books"
      },
      {
        icon: "mdi-google-podcast",
        text: "Podcasts"
      }
    ],
    userItems: [
      {
        icon: "mdi-playlist-music-outline",
        text: "User lists",
        model: false,
        children: [
          {
            icon: "mdi-heart-outline",
            text: "Favourites"
          },
          {
            icon: "mdi-dots-horizontal",
            text: "Other lists"
          },
          {
            icon: "mdi-plus-circle-outline",
            text: "Add list..."
          }
        ]
      }
    ],
    configItems: [
      {
        icon: "mdi-cog-outline",
        text: "Settings"
      },
      {
        icon: "mdi-information-outline",
        text: "About"
      }
    ],
    logoutItems: [
      {
        icon: "mdi-logout",
        text: "Logout"
      }
    ]
  })
};
</script>
