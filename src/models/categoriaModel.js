const pool = require('../config/database');

const getAll = async () => {
  const [rows] = await pool.execute('SELECT * FROM categorias ORDER BY id_categoria');
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.execute(
    'SELECT * FROM categorias WHERE id_categoria = ?',
    [id]
  );
  return rows[0] || null;
};

const create = async (nome) => {
  const [result] = await pool.execute(
    'INSERT INTO categorias (nome) VALUES (?)',
    [nome]
  );
  return { id_categoria: result.insertId, nome };
};

const update = async (id, nome) => {
  const [result] = await pool.execute(
    'UPDATE categorias SET nome = ? WHERE id_categoria = ?',
    [nome, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.execute(
    'DELETE FROM categorias WHERE id_categoria = ?',
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove };