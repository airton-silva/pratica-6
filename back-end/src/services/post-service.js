const postRepo = require("../repositories/post-repo");

class PostService {

  add(userId,post) {
    return postRepo.save(userId, post);
  }

  getAll() {
    return postRepo.findAll();
  }

  getById(id) {
    return postRepo.findOne(id);
  }

  getByCargo(cargo) {
    return postRepo.findByCargo(cargo);
  }

  getQty(qty){
    return postRepo.getByQty(qty)
  }

  update(id, post) {
    return postRepo.update(id, post);
  }

  delete(id) {
    return postRepo.delete(id);
  }
}

module.exports = PostService;