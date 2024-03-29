const AuthController = require('./controllers/AuthController');
const AuthControllerRule = require('./rules/AuthControllerRule');
const TrackController = require('./controllers/TrackController');
const FavoritoController = require('./controllers/FavoritoController');
const UserController = require('./controllers/UserController');

module.exports = (app) => {
    
    // REGISTRO
    app.post('/register',
        AuthControllerRule.requirement,
        AuthControllerRule.register,
        AuthController.register);

    // LOGIN
    app.post('/login',
        AuthControllerRule.requirement,
        AuthController.login);

    // TOP 50
    app.get('/tracks',
        TrackController.getTracklist);
    // Obtener info de track    
    app.get('/tracks/:trackId',
        TrackController.getTrackInfo);

    // Obtener si es favorito
    app.get('/favorito', 
        FavoritoController.isFavorito);
    // Añadir a favoritos
    app.post('/favorito',
        FavoritoController.anadirFavorito);
    // Eliminar de favoritos
    app.delete('/favorito',
        FavoritoController.eliminarFavorito);
    // Obtener la lista de favoritos del usuario
    app.get('/listafavoritos',
        FavoritoController.getListaFavoritosUser);
    // Editar un favorito
    app.post('/editarfavorito',
        FavoritoController.editarFavorito);
    // Obtener comentarios de favorito
    app.get('/favorito/:trackId',
        FavoritoController.getComentarios);

    // Modificar datos de usuario
    app.put('/perfil',
        UserController.actualizar);
    // Obtener info de un user
    app.get('/perfil/:userId',
        UserController.getUser);
};

