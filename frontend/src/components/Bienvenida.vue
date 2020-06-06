<template>
    <div style="background-color: #fff;">
        <div class="contenido">
            <div class="sm-col-12">
                <h2 class="text-center header texto h_2"> 
                    <span style="font-weight: 400">The Content Box</span>
                    es una plataforma en la que podrás gestionar
                    tus contenidos audiovisuales de una manera
                    <span class="span_h2">fácil</span> 
                    y 
                    <span class="span_h2">sencilla</span> 
                    .
                </h2>
            </div>
            <div class="sm-col-12">
                <h2 class="text-center header texto h_2"> 
                    Añade y elimina productos en tu
                    <span class="span_h2_rojo">lista de favoritos  </span> 
                    <v-icon class="span_h2_rojo header" size="60px" >mdi-heart</v-icon>
                    y revísala cuando desees.
                </h2>
            </div>
        </div>
            <h1 class="text_h h_1 text-center header">
                ENTRA Y 
                <span class="span_h1_naranja">DIVIÉRTETE  </span> 
                <v-icon class="span_h1_naranja header" size="80px" style="margin-bottom:25px;" >mdi-party-popper</v-icon>
            </h1>
        <div class="contenido">
                <p class="text-right" style="font-size: 20px;">
                    Powered by
                </p>
                <v-img class="imagen" src="../assets/deezer.png"  width="300"></v-img>
        </div>
        <v-col style="padding: 60px;" >
            
        </v-col>
    </div>
</template>

<script>

export default {
  name: "Bienvenida",
}

</script>

<style scoped>
.texto {
    font-weight: 100;
    margin-bottom: 4%;
    line-height: 4.5rem;
    }
.span_h2 {
    font-weight: 300;
    color: #2196F3;
}
.span_h2_rojo {
    font-weight: 300;
    color: #b21e35;
}

.span_h1_naranja {
    font-weight: 500;
    color: #f77f00;
}

.imagen {
    float: right;
}

.h_2 {
    font-size: 3.56rem;
    line-height: 110%;
    margin: 1.78rem 0 1.424rem 0;
}

.contenido {
    padding-left: 120px;
    padding-right: 120px;
    margin-bottom: 60px;
    margin-top: 40px;
    justify-content: flex-end;
}

.h_1 {
    line-height: 110%;
    margin: 2.1rem 0 1.68rem 0;
    font-weight: 300;
    font-size: 5rem;
}

</style>
