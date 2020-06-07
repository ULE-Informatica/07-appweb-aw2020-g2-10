module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        avatar: DataTypes.STRING,
    }, {
        timestamps: false,
    });

    User.prototype.comparePassword = function (password) {
        return password === this.password;
    };

    return User;
};