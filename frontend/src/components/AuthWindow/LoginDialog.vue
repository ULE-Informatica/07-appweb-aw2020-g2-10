<template>
  <v-card>
    <v-img height="120px" src="https://www.lucushost.com/blog/wp-content/uploads/2018/04/como-proteger-login-wordpress.png">
      <v-container fill-height fluid>
        <v-layout>
          <v-flex xs12 align-end d-flex>
            <span class="headline white--text">Sign in</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-img>

    <v-card-text>
      <div class="error" v-html="error" />
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="email"
          prepend-icon="email"
          type="email"
          label="Email"
          :rules="emailRules"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          prepend-icon="lock"
          type="password"
          label="Password"
          :rules="passwordRules"
          required
        ></v-text-field>
      </v-form>
    </v-card-text>

  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => (v && v.length >= 6) || "Password must be more than 6 characters"
      ],
      error: null,
      valid: false,
      recaptchaResponse: null,
    };
  },
  mounted() {
    this.valid = false;
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.link {
  font-size: 1.1em;
  padding-left: 15px;
  text-decoration: none;
}
.error {
  color: white;
  border-radius: 4px;
  padding-left: 4px;
}
</style>
