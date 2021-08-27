const db = require('../models');
const Post = db.posts;
const Comment = db.comments;
const User = db.users;
const {Op} = require('sequelize');

exports.save = async (userId, post) => {
  console.log(post);
  return await Post.create({
    title: post.title,
    body: post.body,
    userId: userId,
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
      {
        model: User,
        attributes: { exclude: ["userId"] },
      },
    ],
  })
  .then((post) => {
    //console.log(post)
    return post;
  })
  .catch((err) => {
    console.log("Error: ", err);
  });
}

exports.update = async (id, post) => {
  console.log(post.userId);
  return await Post.update(
    {
      title: post.title,
      body: post.body,
      userId: post.userId
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