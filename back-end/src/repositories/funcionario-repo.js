const pool = require("../dbs/postgres");

exports.save = async (funcionario) => {
  //console.log(funcionario)
  const result = await pool.query(
    "INSERT INTO funcionarios(name, cargo, data_nasc, data_admissao, image) VALUES ($1,$2,$3,$4,$5) RETURNING *;",
    [funcionario.name, funcionario.cargo, funcionario.data_nasc, funcionario.data_admissao, funcionario.image]
  );
  return result.rows[0];
};

exports.findAll = async () => {
  const result = await pool.query("SELECT * FROM funcionarios ORDER BY id");
  return result.rows;                                                                                                                  
};

exports.findOne = async (id) => {
  const result = await pool.query("SELECT * FROM funcionarios WHERE id=$1;", [id]);
  return result.rows[0];
};

exports.findByCargo = async (cargo) => {
  const result = await pool.query("SELECT * FROM funcionarios WHERE cargo=$1;", [cargo]);
  return result.rows;
};

exports.getByQty = async (qty) => {
  //var qnt = parseInt(qty);
  console.log(qty);
  const result = await pool.query("SELECT * FROM funcionarios LIMIT $1;",[qty]);
  console.log(result.rows)
  return result.rows;
};

exports.update = async (id, funcionario) => {
  console.log(funcionario);
  const result = await pool.query(
    "UPDATE funcionarios SET name=$1, cargo=$2, data_nasc=$3, data_admissao=$4, image=$5 WHERE id=$6 RETURNING *;",
    [funcionario.name, funcionario.cargo, funcionario.data_nasc, funcionario.data_admissao, funcionario.image, id]
  );
  return result.rows[0];
};

exports.delete = async (id) => {
  await pool.query("DELETE FROM funcionarios WHERE id=$1;", [id]);
}