const Funcionario = require("../models/funcionario-model");
const FuncionarioService = require("../services/funcionario-service");
var funcionarioService = new FuncionarioService();

exports.get = async (req, res) => {
  res.json(await funcionarioService.getAll());
};

exports.getById = async (req, res) => {
  res.json(await funcionarioService.getById(req.params.id));
};

exports.getByCargo = async (req, res) => {
  res.json(await funcionarioService.getByCargo(req.query.cargo));
};

exports.getQty = async (req, res) =>{
  res.json(await funcionarioService.getQty(req.query.qty));
};

exports.post = async (req, res) => {
  let obj = JSON.parse(req.body.funcionario)
  // console.log(obj);
  // console.log(req.file);
  res.json(
      await funcionarioService.add(new Funcionario(obj.name, obj.cargo,obj.data_nasc, 
                                                    obj.data_admissao,req.file.path,
                                                  ))
    );
};

exports.put = async (req, res) => {
  //console.log(req.file.path);
  let obj = JSON.parse(req.body.funcionario)
  res.json(
    await funcionarioService.update(
      req.params.id,
      new Funcionario(obj.name, obj.cargo,obj.data_nasc, 
        obj.data_admissao,req.file.path,))
  );
};

exports.delete = (req, res) => {
  res.json(funcionarioService.delete(req.params.id));
};