<template>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark>
        <v-app-bar-nav-icon v-if="userLoged" @click.stop="$emit('ocultar')"/>
        <v-toolbar-items class="align-center" v-else>
            <v-img height=50 width=50 :src="require('../assets/logo_fondo_azul.png')"></v-img>
        </v-toolbar-items>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
            <span class="mr-3 font-weight-bold">{{text.titulo}}</span>
        </v-toolbar-title>
        <v-spacer />
        <v-spacer />
        <v-toolbar-items v-if="userLoged">
            <v-btn icon>
                <v-icon>mdi-apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
        </v-toolbar-items>
        <v-toolbar-items v-else class="align-center">
            <div>
                <v-btn color=white class="mr-0 blue--text font-weight-bold" height="30">
                    {{text.login}}
                </v-btn>
            </div>
        </v-toolbar-items>
    </v-app-bar>
</template>

<script>
	export default {
        name: "BarraNavegacion",
        props: {
            userLoged: Boolean,
        },
        data: () => ({
            text: {
                titulo: 'The Content Box',
                login: 'LOG IN / SIGN UP'
            },
        }),
	}
</script>