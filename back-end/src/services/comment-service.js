const commentRepo = require("../repositories/comment-repo");

class CommentService {
  add(postId, comment) {
    return commentRepo.save(postId, comment);
  }

  getAll() {
    return commentRepo.findAll();
  }

  getById(id) {
    return commentRepo.findOne(id);
  }

  update(id, comment) {
    return commentRepo.update(id, comment);
  }

  delete(id) {
    return commentRepo.delete(id);
  }
}

module.exports = CommentService;