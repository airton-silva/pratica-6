const Post = require("../domain/post");
const PostService = require("../services/post-service");
var postService = new PostService();

exports.get = async (req, res) => {
  res.json(await postService.getAll());
};

exports.getById = async (req, res) => {
  res.json(await postService.getById(req.params.id));
};

exports.post = async (req, res) => {

  if (req.body.title.length < 3 || req.body.body.length < 5) {
    res.status(400).send();
  } else {
    let post = await postService.add(
      req.body.userId,
      new Post(req.body.title, req.body.body, req.body.userId)
    );

    if (post) {
      res.status(201).json(post);
    } else {
      res.status(409).send();
    }
  }
};

exports.put = async (req, res) => {
  
  if (req.body.title.length < 3 || req.body.body.length < 5) {
    res.status(400).send();
  } else {
    let post = await postService.update(
      req.params.id, 
      new Post(req.body.title, req.body.body, req.body.userId)
    );

    if (post != null) {
      res.status(201).json(post);
    } else {
      res.status(409).send();
    }
  }
};

exports.delete = (req, res) => {
  res.json(postService.delete(req.params.id));
};