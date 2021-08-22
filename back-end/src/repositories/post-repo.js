const db = require('../models');
const Post = db.posts;
const Comment = db.coment;
const {Op} = require('sequelize');

exports.save = async (post) => {
  return await Post.create({
    title: post.title,
    body: post.body,
  })
    .then((result) => {
      console.log("Created Post", + JSON.stringify(result));
      return result;
    })
    .catch((err) => {
      console.log("Erro" + err);
    })
  
};

exports.findAll = async () => {
  const result = await Post.findAll();
  return result;                                                                                                                
};

exports.findOne = async (id) => {
  return await Post.findByPk(id, {
    include: [
      {
        model: Comment,
        attributes: { exclude: ["postId"] },
      },
    ],
  })
    .then((post) => {
      return post;
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

exports.update = async (id, post) => {
  return await Post.update(
    {
      title: post.title,
      body: post.body,
    },
    {
      where: {
        id: id,
      },
      returning: true,
    }
  )
    .then((result) => {
      console.log("Update post: " + JSON.stringify(result));
      return result[1][0]; 
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
  
};

exports.delete = async (id) => {
  await Post.destroy({
    where: {
      id: id,
    },
  });
}