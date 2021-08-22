const userRepo = require("../repositories/user-repo");

class UserService {

  add(user) {
    return userRepo.save(user);
  }

  getAll() {
    return userRepo.findAll();
  }

  getById(id) {
    return userRepo.findOne(id);
  }

  getByCargo(cargo) {
    return userRepo.findByCargo(cargo);
  }

  getQty(qty){
    return userRepo.getByQty(qty)
  }

  update(id, user) {
    return userRepo.update(id, user);
  }

  delete(id) {
    return userRepo.delete(id);
  }
}

module.exports = UserService;