const AuthController = require('./controllers/AuthController');
const AuthControllerRule = require('./rules/AuthControllerRule');
const TrackController = require('./controllers/TrackController');
const urls = require('./config/paths.json');

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
};
