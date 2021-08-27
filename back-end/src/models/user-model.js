module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'users',
        {
            email: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
            country:{
                type: DataTypes.STRING,
            },
            occupation:{
                type: DataTypes.STRING,
            },
            name:{
                type: DataTypes.STRING,
            },
            birthday:{
                type: DataTypes.STRING,
            },
            fone:{
                type: DataTypes.STRING,
            },
            image:{
                type: DataTypes.STRING,
            }
        },
        {
            timestamps: true
        }
    );
    return User;
}