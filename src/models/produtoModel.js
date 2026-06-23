const pool = require('../config/database');

const getAll = async () => {
  const [rows] = await pool.execute(
    `SELECT p.id_produto, p.nome, p.valor, p.estoque, p.categorias_id_categoria,
            c.nome AS categoria_nome
     FROM produtos p
     JOIN categorias c ON c.id_categoria = p.categorias_id_categoria
     ORDER BY p.id_produto`
  );
  return rows;
};

const getById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT p.id_produto, p.nome, p.valor, p.estoque, p.categorias_id_categoria,
            c.nome AS categoria_nome
     FROM produtos p
     JOIN categorias c ON c.id_categoria = p.categorias_id_categoria
     WHERE p.id_produto = ?`,
    [id]
  );
  return rows[0] || null;
};

// Verifica se a categoria informada existe (usado antes de criar/atualizar)
const categoriaExiste = async (idCategoria) => {
  const [rows] = await pool.execute(
    'SELECT id_categoria FROM categorias WHERE id_categoria = ?',
    [idCategoria]
  );
  return rows.length > 0;
};

const create = async ({ nome, valor, estoque, categorias_id_categoria }) => {
  const [result] = await pool.execute(
    `INSERT INTO produtos (nome, valor, estoque, categorias_id_categoria)
     VALUES (?, ?, ?, ?)`,
    [nome, valor, estoque, categorias_id_categoria]
  );
  return { id_produto: result.insertId, nome, valor, estoque, categorias_id_categoria };
};

const update = async (id, { nome, valor, estoque, categorias_id_categoria }) => {
  const [result] = await pool.execute(
    `UPDATE produtos
     SET nome = ?, valor = ?, estoque = ?, categorias_id_categoria = ?
     WHERE id_produto = ?`,
    [nome, valor, estoque, categorias_id_categoria, id]
  );
  return result.affectedRows > 0;
};

const remove = async (id) => {
  const [result] = await pool.execute(
    'DELETE FROM produtos WHERE id_produto = ?',
    [id]
  );
  return result.affectedRows > 0;
};

module.exports = { getAll, getById, categoriaExiste, create, update, remove };