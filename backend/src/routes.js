const AuthController = require('./controllers/AuthController');
const AuthControllerRule = require('./rules/AuthControllerRule');

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
};
