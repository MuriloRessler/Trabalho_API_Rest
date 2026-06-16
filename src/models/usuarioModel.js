const pool = require('../config/database');
const bcrypt = require('bcryptjs');

const findByEmail = async (email) => {
  const [rows] = await pool.execute(
    'SELECT * FROM usuarios WHERE email = ?',
    [email]
  );
  return rows[0] || null;
};

const findById = async (id) => {
  const [rows] = await pool.execute(
    'SELECT id_usuario, nome, email FROM usuarios WHERE id_usuario = ?',
    [id]
  );
  return rows[0] || null;
};

const create = async ({ nome, email, password }) => {
  const salt = await bcrypt.genSalt(12);
  const senhaHash = await bcrypt.hash(password, salt);

  const [result] = await pool.execute(
    'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
    [nome, email, senhaHash]
  );
  return { id_usuario: result.insertId, nome, email };
};

module.exports = { findByEmail, findById, create };