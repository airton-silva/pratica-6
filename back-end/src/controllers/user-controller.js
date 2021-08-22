const User = require("../domain/user");
const UserService = require("../services/user-service");
var userService = new UserService();

exports.get = async (req, res) => {
  res.json(await userService.getAll());
};

exports.getById = async (req, res) => {
  res.json(await userService.getById(req.params.id));
};

exports.post = async (req, res) => {
  if (req.body.email.length < 3 || req.body.password < 5) {
    res.status(400).send();
  } else {
    let user = await userService.add(
      new User(req.body.email, req.body.password)
    );

    if (user != null) {
      res.status(201).json(user);
    } else {
      res.status(409).send();
    }
  }
};

exports.put = async (req, res) => {

  if (req.body.email.length < 3 || req.body.password < 5) {
    res.status(400).send();
  } else {
    let user = await userService.update(
      req.params.id, 
      new User(req.body.email, req.body.password)
    );

    if (user != null) {
      res.status(201).json(user);
    } else {
      res.status(409).send();
    }
  }
};

exports.delete = (req, res) => {
  res.json(userService.delete(req.params.id));
};