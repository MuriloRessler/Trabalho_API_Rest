const pool = require('../config/database');

// Lista pedidos com dados do cliente
const getAll = async () => {
  const [rows] = await pool.execute(
    `SELECT pe.id_pedido, pe.data, pe.clientes_id_cliente, c.nome AS cliente_nome
     FROM pedidos pe
     JOIN clientes c ON c.id_cliente = pe.clientes_id_cliente
     ORDER BY pe.id_pedido`
  );
  return rows;
};

// Busca um pedido + seus itens (produtos_pedidos)
const getById = async (id) => {
  const [pedidoRows] = await pool.execute(
    `SELECT pe.id_pedido, pe.data, pe.clientes_id_cliente, c.nome AS cliente_nome
     FROM pedidos pe
     JOIN clientes c ON c.id_cliente = pe.clientes_id_cliente
     WHERE pe.id_pedido = ?`,
    [id]
  );

  const pedido = pedidoRows[0];
  if (!pedido) return null;

  const [itens] = await pool.execute(
    `SELECT pp.produtos_id_produto, pr.nome AS produto_nome, pp.quantidade, pp.valor
     FROM produtos_pedidos pp
     JOIN produtos pr ON pr.id_produto = pp.produtos_id_produto
     WHERE pp.pedidos_id_pedido = ?`,
    [id]
  );

  return { ...pedido, itens };
};

const clienteExiste = async (idCliente) => {
  const [rows] = await pool.execute(
    'SELECT id_cliente FROM clientes WHERE id_cliente = ?',
    [idCliente]
  );
  return rows.length > 0;
};

const produtoExiste = async (idProduto) => {
  const [rows] = await pool.execute(
    'SELECT id_produto FROM produtos WHERE id_produto = ?',
    [idProduto]
  );
  return rows.length > 0;
};

// Cria pedido + itens em uma transação (tudo ou nada)
// itens = [{ produtos_id_produto, quantidade, valor }, ...]
const create = async ({ data, clientes_id_cliente, itens }) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    const [result] = await conn.execute(
      'INSERT INTO pedidos (data, clientes_id_cliente) VALUES (?, ?)',
      [data, clientes_id_cliente]
    );
    const idPedido = result.insertId;

    if (Array.isArray(itens) && itens.length > 0) {
      for (const item of itens) {
        await conn.execute(
          `INSERT INTO produtos_pedidos (produtos_id_produto, pedidos_id_pedido, quantidade, valor)
           VALUES (?, ?, ?, ?)`,
          [item.produtos_id_produto, idPedido, item.quantidade, item.valor]
        );
      }
    }

    await conn.commit();
    return { id_pedido: idPedido, data, clientes_id_cliente, itens: itens || [] };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

// Atualiza apenas os dados do pedido (data e cliente)
const update = async (id, { data, clientes_id_cliente }) => {
  const [result] = await pool.execute(
    'UPDATE pedidos SET data = ?, clientes_id_cliente = ? WHERE id_pedido = ?',
    [data, clientes_id_cliente, id]
  );
  return result.affectedRows > 0;
};

// Remove pedido (e seus itens, por causa da FK) em uma transação
const remove = async (id) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.execute('DELETE FROM produtos_pedidos WHERE pedidos_id_pedido = ?', [id]);
    const [result] = await conn.execute('DELETE FROM pedidos WHERE id_pedido = ?', [id]);
    await conn.commit();
    return result.affectedRows > 0;
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};

module.exports = { getAll, getById, clienteExiste, produtoExiste, create, update, remove };