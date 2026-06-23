const pool = require('../config/database');

const STATUS_VALIDOS = ['bom', 'medio', 'ruim'];

const getAll = async () => {
  const [rows] = await pool.execute('SELECT * FROM clientes ORDER BY id_cliente');
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.execute(
    'SELECT * FROM clientes WHERE id_cliente = ?',
    [id]
  );
  return rows[0] || null;
};

const create = async ({ nome, telefone, status }) => {
  const statusFinal = STATUS_VALIDOS.includes(status) ? status : 'medio';

  const [result] = await pool.execute(
    'INSERT INTO clientes (nome, telefone, status) VALUES (?, ?, ?)',
    [nome, telefone, statusFinal]
  );
  return { id_cliente: result.insertId, nome, telefone, status: statusFinal };
};

const update = async (id, { nome, telefone, status }) => {
  const statusFinal = STATUS_VALIDOS.includes(status) ? status : 'medio';

  const [result] = await pool.execute(
    'UPDATE clientes SET nome = ?, telefone = ?, status = ? WHERE id_cliente = ?',
    [nome, telefone, statusFinal, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.execute(
    'DELETE FROM clientes WHERE id_cliente = ?',
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, create, update, remove, STATUS_VALIDOS };