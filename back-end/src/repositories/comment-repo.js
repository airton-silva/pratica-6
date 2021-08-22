const db = require("../models");
const Comment = db.comments;

exports.save = async (postId, comment) => {
  return Comment.create({
    description: comment.description,
    postId: postId,
  })
    .then((result) => {
      console.log("Created comment: " + JSON.stringify(result));
      return result;
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

exports.findAll = async () => {
  const result = await Comment.findAll();
  return result;
};

exports.findOne = async (id) => {
  const result = await Comment.findOne({
    where: {
      id: id,
    },
  });
  return result;
};

exports.update = async (id, comment) => {
  return await Comment.update(
    {
      description: comment.description,
    },
    {
      where: {
        id: id,
      },
      returning: true,
    }
  )
    .then((result) => {
      console.log("Update comment: " + JSON.stringify(result));
      return result[1][0]; // Only Postgres, 1 is number of affect records, 0 is first element
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

exports.delete = async (id) => {
  await Comment.destroy({
    where: {
      id: id,
    },
  });
};