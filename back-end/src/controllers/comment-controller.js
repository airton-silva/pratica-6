const Comment = require("../domain/comment");
const CommentService = require("../services/comment-service");
var commentService = new CommentService();

exports.get = async (req, res) => {
  res.json(await commentService.getAll());
};

exports.getById = async (req, res) => {
  res.json(await commentService.getById(req.params.id));
};

exports.post = async (req, res) => {
  res.json(
    await commentService.add(
      req.body.postId,
      new Comment(req.body.description)
    )
  );
};

exports.put = async (req, res) => {
  res.json(
    await commentService.update(
      req.params.id,
      new Comment(req.body.description)
    )
  );
};

exports.delete = (req, res) => {
  res.json(commentService.delete(req.params.id));
};
