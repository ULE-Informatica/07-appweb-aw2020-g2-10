module.exports = (sequelize, DataTypes) => {
    const Favorito = sequelize.define('Favorito', {
        producto: DataTypes.INTEGER,
        comentario: DataTypes.STRING,
        puntuacion: DataTypes.TEXT,
    }, {
        timestamps: false,
    });

    Favorito.associate = (models) => {
        Favorito.belongsTo(models.User);
    };
    
    return Favorito;
};
