module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        'posts',
        {
            title: {
                type: DataTypes.STRING,
            },
            body: {
                type: DataTypes.STRING,
            }
        },
        {
            timestamps: true
        }
    );
    return Post;
}