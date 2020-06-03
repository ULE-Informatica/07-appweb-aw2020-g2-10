module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        username: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        timestamps: false,
    });

    return User;
};