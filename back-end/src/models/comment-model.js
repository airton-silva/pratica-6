module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
        'comments',
        {
            description: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: true
        }
    );
    return Comment;
}