<template>
    <div style="background-color: #30323d;">
       <v-row class="mb-6" no-gutters>
        <v-col id="texto" style="padding: 20px; padding-bottom: 20px;">
            <p class="headline font-weight-light" style="padding-bottom: 20px;">
                The Content Box es una plataforma en la que podrás gestionar
                tus contenidos audiovisuales de una manera fácil y sencilla.
            </p>
            <p class="headline font-weight-light " style="padding-bottom: 20px;">
                Añade y elimina productos en tu lista de favoritos y revísala
                cuando desees.
            </p>
            <p class="light-italic display-2 yellow--text text-center" style="padding-bottom: 20px;">
                ENTRA Y DIVIÉRTETE
            </p>
        </v-col>
        <v-col style="padding: 60px;" >
            <p class="light-italic yellow--text text-right" style="padding-bottom: 20px;">
                Powered by
            </p>
            <v-img src="../assets/deezer.png" width="450"></v-img>
        </v-col>
       </v-row>
    </div>
</template>

<script>

export default {
  name: "Bienvenida",
}

</script>

<style scoped>
#texto {
    color: white;

}
</style>
