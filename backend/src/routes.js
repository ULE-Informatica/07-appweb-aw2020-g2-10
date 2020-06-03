const AuthController = require('./controllers/AuthController');
const AuthControllerRule = require('./rules/AuthControllerRule');

module.exports = (app) => {
    app.post('/register',
        AuthControllerRule.requirement,
        AuthControllerRule.register,
        AuthController.register);
};
