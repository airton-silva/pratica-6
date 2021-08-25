const userRepo = require("../repositories/user-repo");

class UserService {

  add(user) {
    return userRepo.save(user);
  }

  getAll() {
    return userRepo.findAll();
  }

  getAuth(email, password) {
    return userRepo.findAuth(email, password);
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