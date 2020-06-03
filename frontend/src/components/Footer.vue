<template>
  <v-footer color="#2272CC" padless fixed>
    <v-row justify="center" no-gutters>
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
        height="15"
      >
        {{ link }}
      </v-btn>
      <v-card-text class="py-2 primary darken-3 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>The Content Box ©</strong>
      </v-card-text>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    links: ["Home", "About Us", "Team", "Contact Us"]
  })
};
</script>
