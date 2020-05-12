<template>
    <v-app id="inspire">
        <Drawer v-bind:visible="drawer" />
        <BarraNavegacion v-bind:userLoged="usuarioLogeado" v-on:ocultar="ocultarDrawer"/>
        <v-content>
            <transition name="fade" mode="out-in">
                <Music v-if="usuarioLogeado"/>
                <PaginaPrincipal v-else/>
            </transition>
        </v-content>
        <Footer/>
    </v-app>
</template>

<script>
import Drawer from "@/components/Drawer.vue";
import BarraNavegacion from "@/components/BarraNavegacion.vue";
import Footer from "@/components/Footer.vue";
import Music from "@/components/Music.vue";
import PaginaPrincipal from "@/components/PaginaPrincipal.vue";

export default {
    name: "Home",
    components: {
        Drawer,
        BarraNavegacion,
        Footer,
        Music,
        PaginaPrincipal
    },
    props: {
        source: String
    },
    data: () => ({
        drawer: false,
        usuarioLogeado: true,
    }),
    methods: {
        ocultarDrawer: function() {
            this.drawer = !this.drawer;
        }
    },
};
</script>