const db = require('../models');
const User = db.users;

exports.save = async (user) => {
  return await User.create({
    email: user.email,
    password: user.password,
  })
    .then((result) => {
      console.log("Created User", + JSON.stringify(result));
      return result;
    })
    .catch((err) => {
      console.log("Erro" + err);
    })
  
};

exports.findAll = async () => {
  const result = await User.findAll();
  return result;                                                                                                                
};

exports.findOne = async (id) => {
  return await User.findByPk(id, {
    include: [
      {
        model: Comment,
        attributes: { exclude: ["userId"] },
      },
    ],
  })
    .then((user) => {
      return user;
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
}

exports.update = async (id, user) => {
  return await User.update(
    {
      email: user.email,
      password: user.password,
    },
    {
      where: {
        id: id,
      },
      returning: true,
    }
  )
    .then((result) => {
      console.log("Update user: " + JSON.stringify(result));
      return result[1][0]; 
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
  
};

exports.delete = async (id) => {
  await User.destroy({
    where: {
      id: id,
    },
  });
}